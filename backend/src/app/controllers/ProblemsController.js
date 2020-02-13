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
    const problems = await DeliveryProblem.findAll({
      include: [{ model: Delivery, as: 'delivery' }],
    });

    return res.json(problems);
  }
}

export default new ProblemsController();
