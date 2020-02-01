import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async store(req, res) {
    const { deliveryId } = req.params;

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ erro: 'Validations fails' });

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
