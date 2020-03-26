import AvailableService from '../services/AvailableService';

// controller para retornar os horarios disponiveis naquele dia (pega por hora atual e o dia atual)
class AvailableController {
  async index(req, res) {
    const searchDate = Number(new Date().getTime());

    const available = await AvailableService.run({ date: searchDate });

    return res.json(available);
  }
}

export default new AvailableController();
