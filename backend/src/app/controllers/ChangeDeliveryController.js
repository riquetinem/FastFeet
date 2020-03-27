import * as Yup from 'yup';

import WithdrawDeliveryService from '../services/WithdrawDeliveryService';
import DeliveriedDeliveryService from '../services/DeliveriedDeliveryService';
import CancelDeliveryService from '../services/CancelDeliveryService';

// controller para alterar o status da entrega
class ChangeDeliveryController {
  // retirada da entrega do deposito pelo entregador
  async store(req, res) {
    const { deliveryId, deliverymanId } = req.params;
    const { date } = req.body;

    if (!date) return res.status(400).json({ error: 'Invalid date' });

    const delivery = await WithdrawDeliveryService.run({
      deliverymanId,
      deliveryId,
      date,
    });

    return res.json(delivery);
  }

  // entrega realizada pelo entregador ao destinatario
  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;

    const schema = Yup.object().shape({
      originalname: Yup.string().required(),
      filename: Yup.string().required(),
    });

    if (!(await schema.isValid(req.file)))
      return res.status(401).json({ error: 'Validations fails' });

    const delivery = await DeliveriedDeliveryService.run({
      deliverymanId,
      deliveryId,
      file: req.file,
    });

    return res.json(delivery);
  }

  // entrega cancelada devido algum problema
  async delete(req, res) {
    const { problemId } = req.params;

    const delivery = await CancelDeliveryService.run({ problemId });

    return res.json(delivery);
  }
}

export default new ChangeDeliveryController();
