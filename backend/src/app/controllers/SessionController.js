import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

// controller para criar a sessao do usuario
class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // verifica se a senha esta correta ou se o usuario nao foi encontrado
    if (!(await user.checkPassword(password)) || !user)
      return res.status(401).json({ error: 'User or password are wrong!' });

    const { id, name } = user;

    // retorna o usuario logado e o jwt
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
