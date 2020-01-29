import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
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
}

export default new RecipientController();
