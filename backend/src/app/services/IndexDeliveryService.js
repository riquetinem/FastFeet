import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class IndexDeliveryService {
  async run({ deliveryId, page, product }) {
    if (deliveryId) {
      const delivery = await Delivery.findByPk(deliveryId, {
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: ['id', 'name'],
          },
        ],
      });

      return delivery;
    }
    const whereStatement = {};

    const limit = 10;
    const offset = (page - 1) * limit;

    if (product) whereStatement.product = { [Op.iLike]: `%${product}%` };

    const deliveries = await Delivery.findAndCountAll({
      where: whereStatement,
      order: ['id'],
      limit,
      offset,
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'name', 'url'],
        },
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

    return deliveries;
  }
}

export default new IndexDeliveryService();
