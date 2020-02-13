import MailConfig from '../../lib/Mail';

class CancelDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { delivery } = data;

    // seta o corpo do email, e passa as informacoes para o mesmo
    // como por exemplo o nome do entregador, o produto etc
    await MailConfig.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega cancelada!',
      template: 'cancelDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: delivery.recipient.name,
        product: delivery.product,
      },
    });
  }
}

export default new CancelDelivery();
