import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

// controller para mostrar as encomendas do entregador
class ViewDeliveriesController {
  async index(req, res) {
    const { deliverymanId, menuContext } = req.params;

    // Verifica se existe um entregador com o id informado
    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman)
      return res.status(404).json({ error: 'Deliveryman not found' });

    if (menuContext === 'pending') {
      // mostra apenas as que nao foram entregues, retiradas e que sao apenas do entregador
      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id: deliverymanId,
          signature_id: null,
          end_date: null,
          canceled_at: null,
        },
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['name', 'email'],
          },
          {
            model: Recipient,
            as: 'recipient',
          },
          {
            model: File,
            as: 'signature',
            attributes: ['path', 'name', 'url'],
          },
        ],
        order: ['id'],
      });

      return res.json(deliveries);
    }
    console.log('deliveried');
    // mostra apenas as que nao foram entregues, retiradas e que sao apenas do entregador
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliverymanId,
        signature_id: { [Op.ne]: null },
        end_date: { [Op.ne]: null },
        canceled_at: null,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
      order: ['id'],
    });

    return res.json(deliveries);
  }
}

export default new ViewDeliveriesController();
