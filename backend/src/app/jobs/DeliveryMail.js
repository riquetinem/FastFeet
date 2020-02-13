import MailConfig from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    // seta o corpo do email, e passa as informacoes para o mesmo
    await MailConfig.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Nova entrega!',
      template: 'sendDelivery',
      context: {
        deliveryman: delivery.deliveryman.name,
        recipient: delivery.recipient.name,
        product: delivery.product,
      },
    });
  }
}

export default new DeliveryMail();
