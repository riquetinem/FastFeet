import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveriedDeliveryService {
  async run({ deliverymanId, deliveryId, file }) {
    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) throw new Error('Deliveryman not found');

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        canceled_at: null,
      },
    });

    if (!delivery) throw new Error('Delivery not found');

    if (!delivery.start_date)
      throw new Error('This delivery has not been picked up');

    const { originalname: name, filename: path } = file;

    const { id } = await File.create({
      name,
      path,
    });

    delivery.end_date = new Date();
    delivery.signature_id = id;
    delivery.save();

    return delivery;
  }
}

export default new DeliveriedDeliveryService();
