import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import * as DeliveriesActions from '~/store/modules/deliveries/actions';

import api from '~/services/api';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('O nome do produto é obrigatório'),
  recipient_id: Yup.string().required('O destinatário é obrigatório'),
  deliveryman_id: Yup.string().required('O entregador é obrigatório'),
});

export default function Delivery({ match }) {
  const { id } = match.params;

  const [delivery, setDelivery] = useState('');
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveryman() {
      const res = await api.get('/deliveryman', { params: { all: true } });

      const deliveryman = res.data.map(d => ({
        id: d.id,
        title: d.name,
      }));

      setDeliverymen(deliveryman);
    }

    async function loadRecipients() {
      const res = await api.get('/recipient', { params: { all: true } });

      const recipient = res.data.map(r => ({
        id: r.id,
        title: r.name,
      }));

      setRecipients(recipient);
    }

    async function loadDelivery() {
      if (id) {
        const res = await api.get(`/delivery/${id}`);

        const deliverymanDefault = {
          id: res.data.deliveryman.id,
          title: res.data.deliveryman.name,
        };

        const recipientDefault = {
          id: res.data.recipient.id,
          title: res.data.recipient.name,
        };

        res.data.deliverymanDefault = deliverymanDefault;
        res.data.recipientDefault = recipientDefault;

        setDelivery(res.data);
      }
    }

    loadDeliveryman();
    loadRecipients();
    loadDelivery();
  }, [id]);

  console.tron.log(delivery.recipientDefault);
  console.tron.log(delivery.deliverymanDefault);

  async function handleSubmit(data) {
    if (!id) {
      dispatch(DeliveriesActions.addRequest(data));
    } else {
      data.id = id;
      dispatch(DeliveriesActions.updateRequest(data));
    }
  }

  return (
    <Container>
      <Content>
        <Form initialData={delivery} onSubmit={handleSubmit} schema={schema}>
          <div id="first-row">
            <h2>{delivery ? 'Edição ' : 'Cadastro '} de encomendas</h2>

            <ul id="nav-buttons">
              <li>
                <Link to="/recipients">
                  <button type="button" id="back">
                    <MdKeyboardArrowLeft size={30} color="#000" /> Voltar
                  </button>
                </Link>
              </li>

              <li>
                <button type="submit">
                  <MdDone size={30} color="#fff" />
                  {delivery ? 'Salvar ' : 'Cadastrar '}
                </button>
              </li>
            </ul>
          </div>

          <strong>Entregadores</strong>
          <Select
            name="deliveryman_id"
            placeholder={
              delivery ? delivery.deliveryman.name : 'Selecione uma opção... '
            }
            defaultValue={delivery.deliveryman_id}
            options={deliverymen}
          />

          <strong>Destinatários</strong>
          <Select
            name="recipient_id"
            placeholder={
              delivery ? delivery.recipient.name : 'Selecione uma opção... '
            }
            defaultValue={delivery.recipient_id}
            options={recipients}
          />

          <strong>Nome do produto</strong>
          <Input name="product" placeholder="Xiaomi redmi note 8 pro" />
        </Form>
      </Content>
    </Container>
  );
}

Delivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
