import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class UpdateDeliveryService {
  async run({ deliveryId, requestBody }) {
    const delivery = await Delivery.findByPk(deliveryId, {
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

    delivery.update(requestBody);

    return delivery;
  }
}

export default new UpdateDeliveryService();
