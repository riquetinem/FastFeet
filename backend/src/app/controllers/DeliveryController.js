import Delivery from '../models/Delivery';

import IndexDeliveryService from '../services/IndexDeliveryService';
import CreateDeliveryService from '../services/CreateDeliveryService';
import UpdateDeliveryService from '../services/UpdateDeliveryService';

// controller responsavel para as entregas
class DeliveryController {
  // retorna todas as entregas
  async index(req, res) {
    const { deliveryId } = req.params;
    const { q, page = 1 } = req.query;

    const deliveries = await IndexDeliveryService.run({
      deliveryId,
      page,
      product: q,
    });

    return res.json({ deliveries });
  }

  // cria a entrega
  async store(req, res) {
    const { deliveryman_id, recipient_id, product } = req.body;

    const delivery = await CreateDeliveryService.run({
      deliveryman_id,
      recipient_id,
      product,
    });

    return res.json(delivery);
  }

  // faz alteracao na entrega
  async update(req, res) {
    const { deliveryId } = req.params;
    const requestBody = req.body;

    const delivery = await UpdateDeliveryService.run({
      deliveryId,
      requestBody,
    });

    return res.json(delivery);
  }

  // deleta a entrega
  async delete(req, res) {
    const { deliveryId } = req.params;

    // deleta a entrega
    const delivery = await Delivery.destroy({
      where: {
        id: deliveryId,
      },
    });

    if (delivery) return res.send(200).json({ deleted: true });

    return res.send(404);
  }
}

export default new DeliveryController();
