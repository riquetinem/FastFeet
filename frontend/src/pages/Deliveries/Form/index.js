import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { Content } from './styles';

const schema = Yup.object().shape({
  product: Yup.string().required('O nome do produto é obrigatório'),
  recipient_id: Yup.string().required('O destinatário é obrigatório'),
  deliveryman_id: Yup.string().required('O entregador é obrigatório'),
});

export default function DeliveryForm({ match }) {
  const { id } = match.params;

  const [delivery, setDelivery] = useState('');
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipients, setRecipients] = useState([]);

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
          id: res.data.deliveries.deliveryman.id,
          title: res.data.deliveries.deliveryman.name,
        };

        const recipientDefault = {
          id: res.data.deliveries.recipient.id,
          title: res.data.deliveries.recipient.name,
        };

        res.data.deliveries.deliverymanDefault = deliverymanDefault;
        res.data.deliveries.recipientDefault = recipientDefault;

        setDelivery(res.data.deliveries);
      }
    }

    loadDeliveryman();
    loadRecipients();
    loadDelivery();
  }, [id]);

  async function handleSubmit(data) {
    if (!id) {
      try {
        const res = await api.post('/delivery', data);
        toast.success('Encomenda cadastrada com sucesso');
        history.push(`/edit/delivery/${res.data.id}`);
      } catch (error) {
        toast.error('Erro ao criar uma encomenda');
      }
    } else {
      try {
        await api.put(`/delivery/${id}`, data);
        toast.success('Encomenda atualizada com sucesso');
      } catch (error) {
        toast.error('Erro ao atualizar uma encomenda');
      }
    }
  }

  return (
    <Content>
      <Form initialData={delivery} onSubmit={handleSubmit} schema={schema}>
        <div id="first-row">
          <h2>{delivery ? 'Edição ' : 'Cadastro '} de encomendas</h2>

          <ul id="nav-buttons">
            <li>
              <Link to="/deliveries">
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

        <Select
          name="deliveryman_id"
          label="Entregadores"
          placeholder={
            delivery ? delivery.deliveryman.name : 'Selecione uma opção... '
          }
          defaultValue={delivery.deliveryman_id}
          options={deliverymen}
        />

        <Select
          name="recipient_id"
          label="Destinatários"
          placeholder={
            delivery ? delivery.recipient.name : 'Selecione uma opção... '
          }
          defaultValue={delivery.recipient_id}
          options={recipients}
        />

        <Input
          name="product"
          label="Nome do produto"
          placeholder="Xiaomi redmi note 8 pro"
        />
      </Form>
    </Content>
  );
}

DeliveryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
