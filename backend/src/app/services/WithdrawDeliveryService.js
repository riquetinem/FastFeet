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

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class WithdrawDeliveryService {
  async run({ deliverymanId, deliveryId, date }) {
    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) throw new Error('Deliveryman not found');

    // verifica se realmente a entrega esta com aquele entregador
    const delivery = await Delivery.findOne({
      where: { id: deliveryId, deliveryman_id: deliverymanId },
    });

    if (!delivery) throw new Error('Delivery not found');

    // transforma a data recebida para number
    const searchDate = Number(new Date(date).getTime());

    // array da hora inicial e da hora final para poder ser feita a retirada das entregas
    const deliveryTime = ['08:00', '18:00'];

    // verifica se a hora atual esta entre as datas permitidas
    // ou seja, se ela esta entre as 8 e as 18
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

    // verifica se o horario eh valido
    if (!(availables[0].available && availables[1].available))
      throw new Error('Wait for delivery time');

    // verifica quantas entregas o entregador ja retirou
    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    if (count > 5) throw new Error('You can only make five withdrawals a day');

    delivery.start_date = new Date();
    delivery.save();

    return delivery;
  }
}

export default new WithdrawDeliveryService();
