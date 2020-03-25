import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

// controller para problemas na entrega/encomenda
class DeliveryProblemController {
  // lista todos os problemas da entrega
  async index(req, res) {
    const { deliveryId } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: deliveryId },
      include: [{ model: Delivery, as: 'delivery', attributes: ['product'] }],
    });

    return res.json(problems);
  }

  // cadastra problemas na entrega/encomenda
  async store(req, res) {
    const { deliveryId } = req.params;

    const { description } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        canceled_at: null,
        end_date: null,
        signature_id: null,
      },
    });

    if (!delivery) return res.status(404).json({ erro: 'Delivery not found' });

    // verifica se a encomenda ainda nao foi retirada
    if (!delivery.start_date)
      return res
        .status(404)
        .json({ erro: 'This delivery has not been picked up' });

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: deliveryId,
      description,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
