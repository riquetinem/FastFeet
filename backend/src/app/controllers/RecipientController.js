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
    return res.json({ ok: true });
  }
}

export default new RecipientController();
