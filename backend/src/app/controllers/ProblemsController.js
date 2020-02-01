import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class ProblemsController {
  async index(req, res) {
    // posteriormente tentar arrumar aqui para fazer que apareca UMA entrega com seus problemas
    // atualmente esta aparecendo TODAS OS PROBLEMAS sem nenhum tipo de agrupamento
    const problems = await DeliveryProblem.findAll({
      include: [{ model: Delivery, as: 'delivery' }],
    });

    return res.json(problems);
  }
}

export default new ProblemsController();
