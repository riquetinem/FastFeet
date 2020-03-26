import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class CreateDeliveryService {
  async run({ deliveryman_id, recipient_id, product }) {
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    // verifica se o entregador realmente existe
    if (!deliveryman) throw new Error('Deliveryman not found');

    const recipient = await Recipient.findByPk(recipient_id);

    // verifica se o destinatario realmente existe
    if (!recipient) throw new Error('Recipient not found');

    const { id } = await Delivery.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    const delivery = await Delivery.findByPk(id, {
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

    // envia um email para o entregador falando que ele possui uma nova entrega a ser feita
    await Queue.add(DeliveryMail.key, {
      delivery,
    });

    return delivery;
  }
}

export default new CreateDeliveryService();
