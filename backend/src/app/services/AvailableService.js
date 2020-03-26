import { setHours, setMinutes, setSeconds, format, isAfter } from 'date-fns';

class AvailableService {
  async run({ date }) {
    const deliveryTime = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ];

    // funcao para formatar as datas e falar se sao disponiveis ou nao
    const available = deliveryTime.map(time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(setMinutes(setHours(date, hour), minute), 0);

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available: isAfter(value, new Date()),
      };
    });

    return available;
  }
}

export default new AvailableService();
