import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class ChangeDeliveryController {
  async store(req, res) {
    const { deliveryId, deliverymanId } = req.params;
    const { date } = req.query;

    if (!date) return res.status(400).json({ error: 'Invalid date' });

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliverymanId)
      return res.status(404).json({ error: 'Deliveryman not found' });

    const delivery = await Delivery.findOne({
      where: { id: deliveryId, deliveryman_id: deliverymanId },
    });

    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    const searchDate = Number(date);

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    if (count > 5)
      return res
        .status(400)
        .json({ error: 'You can only make five withdrawals a day' });

    delivery.start_date = new Date();
    delivery.save();

    return res.json(delivery);
  }
}

export default new ChangeDeliveryController();
