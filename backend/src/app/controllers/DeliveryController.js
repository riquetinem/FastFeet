import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Delivery from '../models/Delivery';
import File from '../models/File';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

// controller responsavel para as entregas
class DeliveryController {
  // retorna todas as entregas
  async index(req, res) {
    const whereStatement = {};
    const { q, page = 1 } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    if (q) whereStatement.product = { [Op.iLike]: `%${q}%` };

    const deliveries = await Delivery.findAndCountAll({
      where: whereStatement,
      order: ['id'],
      limit,
      offset,
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],

          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['path', 'name', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'rua',
            'cep',
            'numero',
            'estado',
            'cidade',
            'bairro',
            'complemento',
          ],
        },
      ],
    });

    const next = !(offset + limit >= deliveries.count);
    deliveries.next = next;

    return res.json({ deliveries });
  }

  // cria a entrega
  async store(req, res) {
    // verifica se as informacoes foram passadas
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const { deliveryman_id, recipient_id, product } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    // verifica se o entregador realmente existe
    if (!deliveryman)
      return res.status(401).json({ error: 'Deliveryman not found' });

    const recipient = await Recipient.findByPk(recipient_id);

    // verifica se o destinatario realmente existe
    if (!recipient)
      return res.status(401).json({ error: 'Recipient not found' });

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

    return res.json(delivery);
  }

  // faz alteracao na entrega
  async update(req, res) {
    const { deliveryId } = req.params;

    const { deliveryman_id, recipient_id } = req.body;

    if (deliveryman_id || recipient_id)
      return res
        .status(401)
        .json({ error: 'You cannot change the deliveryman or recipient' });

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

    delivery.update(req.body);

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
