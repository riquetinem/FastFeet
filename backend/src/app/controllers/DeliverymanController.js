import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

// controller para o entregador
class DeliverymanController {
  // lista todos os entregadores ordenados pelo id
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'name', 'url'],
        },
      ],
      order: ['id'],
    });

    return res.json(deliverymans);
  }

  // cria um novo entregador
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    // verifica se o email ja esta em uso
    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists)
      return res.status(400).json({ error: 'Email in use' });

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  // faz as alteracoes no entregador
  async update(req, res) {
    const { deliverymanId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman)
      return res.status(404).json({ error: 'Deliveryman not found' });

    const { id, name, email, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  // deleta o entregador
  async delete(req, res) {
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.destroy({
      where: { id: deliverymanId },
    });

    if (deliveryman) return res.send(200).json({ deleted: true });

    return res.send(404);
  }
}

export default new DeliverymanController();
