import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancelDelivery from '../jobs/CancelDelivery';
import Queue from '../../lib/Queue';

class CancelDeliveryService {
  async run({ problemId }) {
    const { delivery_id } = await DeliveryProblem.findByPk(problemId);

    const delivery = await Delivery.findByPk(delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    if (!delivery) throw new Error('Delivery not found');

    // verifica se a entrega ja foi cancelada
    if (delivery.canceled_at)
      throw new Error('Delivery has already been canceled');

    // define a data que a entrega foi cancelada
    delivery.canceled_at = new Date();
    delivery.save();
    // envia um email para o entregador falando que a entrega foi cancelada
    await Queue.add(CancelDelivery.key, {
      delivery,
    });

    return delivery;
  }
}

export default new CancelDeliveryService();
