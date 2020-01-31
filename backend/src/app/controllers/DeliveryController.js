import * as Yup from 'yup';

import pt from 'date-fns/locale/pt';

import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Delivery from '../models/Delivery';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const { deliveryman_id, recipient_id, product } = req.body;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman)
      return res.status(401).json({ error: 'Deliveryman not found' });

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient)
      return res.status(401).json({ error: 'Recipient not found' });

    const delivery = await Delivery.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    return res.json(delivery);
  }
}

export default new DeliveryController();
