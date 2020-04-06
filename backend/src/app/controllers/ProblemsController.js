import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

// controller dedicado a usuarios autenticados para mexer com os problemas
class ProblemsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    const problems = await DeliveryProblem.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          where: { canceled_at: null },
        },
      ],
    });

    const next = !(offset + limit >= problems.count);

    problems.next = next;
    return res.json({ problems });
  }
}

export default new ProblemsController();
