import User from '../models/User';

// controller para usuarios que podem se autenticar
class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) return res.status(400).json({ error: 'Email in use' });

    const { id, name, email } = await User.create(req.body);

    return res.json(id, name, email);
  }
}

export default new UserController();
