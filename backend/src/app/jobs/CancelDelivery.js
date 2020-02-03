import MailConfig from '../../lib/Mail';

class CancelDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { delivery } = data;

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
