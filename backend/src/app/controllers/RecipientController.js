import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

// controller para o destinatario
class RecipientController {
  // retorna todos os destinatarios
  async index(req, res) {
    // caso seja passado o id no param ele retorna apenas aquele destinatario
    const { recipientId } = req.params;

    if (recipientId) {
      const recipient = await Recipient.findByPk(recipientId);

      return res.json(recipient);
    }

    const whereStatement = {};
    const { q, page = 1 } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    if (q) whereStatement.name = { [Op.iLike]: `%${q}%` };

    const recipients = await Recipient.findAndCountAll({
      where: whereStatement,
      limit,
      offset,
      order: ['id'],
    });
    const next = !(offset + limit >= recipients.count);

    recipients.next = next;
    return res.json({ recipients });
  }

  // realizar o cadastro
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      bairro: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const { id, name, rua, cep } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      rua,
      cep,
    });
  }

  // realizar a atualizacao do destinatario
  async update(req, res) {
    const { recipientId } = req.params;

    // a unica verificacao mais necessaria eh o numero continuar como numero
    const schema = Yup.object().shape({
      name: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      bairro: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validations fails' });

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient)
      return res.status(404).json({ error: 'Recipient not found' });

    const {
      id,
      name,
      rua,
      cep,
      complemento,
      cidade,
      estado,
      bairro,
      numero,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      cep,
      bairro,
      rua,
      numero,
      complemento,
      estado,
      cidade,
    });
  }

  // deleta o destinatario
  async delete(req, res) {
    const { recipientId } = req.params;

    const recipient = await Recipient.destroy({
      where: { id: recipientId },
    });

    if (recipient) return res.send(200).json({ deleted: true });

    return res.send(404);
  }
}

export default new RecipientController();
