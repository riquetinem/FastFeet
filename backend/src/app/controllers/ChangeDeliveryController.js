import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  isBefore,
} from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';
import File from '../models/File';

import CancelDelivery from '../jobs/CancelDelivery';
import Queue from '../../lib/Queue';

class ChangeDeliveryController {
  async store(req, res) {
    const { deliveryId, deliverymanId } = req.params;
    const { date } = req.query;

    if (!date) return res.status(400).json({ error: 'Invalid date' });

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman)
      return res.status(404).json({ error: 'Deliveryman not found' });

    const delivery = await Delivery.findOne({
      where: { id: deliveryId, deliveryman_id: deliverymanId },
    });

    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    const searchDate = Number(date);

    const deliveryTime = ['08:00', '18:00'];

    const availables = deliveryTime.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          time === deliveryTime[1]
            ? isAfter(value, new Date())
            : isBefore(value, new Date()),
      };
    });

    if (!(availables[0].available && availables[1].available))
      return res.status(400).json({ error: 'Wait for delivery time' });

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

  async update(req, res) {
    const { deliveryId, deliverymanId } = req.params;

    const schema = Yup.object().shape({
      originalname: Yup.string().required(),
      filename: Yup.string().required(),
    });

    if (!(await schema.isValid(req.file)))
      return res.status(401).json({ error: 'Validations fails' });

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman)
      return res.status(404).json({ error: 'Deliveryman not found' });

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        canceled_at: null,
      },
    });

    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });

    if (!delivery.start_date)
      return res
        .status(404)
        .json({ error: 'This delivery has not been picked up' });

    const { originalname: name, filename: path } = req.file;

    const { id } = await File.create({
      name,
      path,
    });

    delivery.end_date = new Date();
    delivery.signature_id = id;
    delivery.save();

    return res.json(delivery);
  }

  async delete(req, res) {
    const { problemId } = req.params;

    const { delivery_id } = await DeliveryProblem.findByPk(problemId);

    const delivery = await Delivery.findByPk(delivery_id, {
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

    if (!delivery) return res.status(400).json({ error: 'Delivery not found' });

    if (delivery.canceled_at)
      return res
        .status(400)
        .json({ error: 'Delivery has already been canceled' });

    delivery.canceled_at = new Date();
    delivery.save();

    await Queue.add(CancelDelivery.key, {
      delivery,
    });

    return res.json(delivery);
  }
}

export default new ChangeDeliveryController();
