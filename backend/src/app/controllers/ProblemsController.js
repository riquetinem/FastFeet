import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

// controller dedicado a usuarios autenticados para mexer com os problemas
class ProblemsController {
  async index(req, res) {
    /**
     * TODO:
     * - mostrar UMA entrega com TODOS os problemas
     * -------ATUALMENTE-------
     * - mostra TODOS os problemas e junto dele a entrega sem nenhum tipo de agrupamento
     */
    const { page = 1 } = req.query;

    const limit = 10;
    const offset = (page - 1) * limit;

    const problems = await DeliveryProblem.findAndCountAll({
      limit,
      offset,
      include: [{ model: Delivery, as: 'delivery' }],
    });

    const next = !(offset + limit >= problems.count);

    problems.next = next;
    return res.json({ problems });
  }
}

export default new ProblemsController();
