import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import AvatarInput from './AvatarInput';

import { Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O nome é obrigatório!'),
  avatar_id: Yup.number(),
});

export default function DeliverymanForm({ match }) {
  const { id } = match.params;
  const [deliveryman, setDeliveryman] = useState('');

  useEffect(() => {
    async function loadDeliveryman() {
      if (id) {
        const res = await api.get(`/deliveryman/${id}`);
        const { data } = res;
        setDeliveryman(data);
      }
    }

    loadDeliveryman();
  }, [id]);

  async function handleSubmit(data) {
    if (!id) {
      try {
        const res = await api.post('/deliveryman', data);
        toast.success('Entregador cadastrado com sucesso');
        history.push(`/edit/deliveryman/${res.data.id}`);
      } catch (error) {
        toast.success('Erro ao cadastrar o entregador');
      }
    } else {
      try {
        await api.put(`/deliveryman/${id}`, data);
        toast.success('Entregador atualizado com sucesso');
      } catch (error) {
        toast.error('Erro ao atualizar o entregador');
      }
    }
  }

  return (
    <Content>
      <Form initialData={deliveryman} onSubmit={handleSubmit} schema={schema}>
        <div id="first-row">
          <h2>{deliveryman ? 'Edição ' : 'Cadastro '} de entregadores</h2>

          <ul id="nav-buttons">
            <li>
              <Link to="/deliverymen">
                <button type="button" id="back">
                  <MdKeyboardArrowLeft size={30} color="#000" /> Voltar
                </button>
              </Link>
            </li>

            <li>
              <button type="submit">
                <MdDone size={30} color="#fff" />
                {deliveryman ? 'Salvar ' : 'Cadastrar '}
              </button>
            </li>
          </ul>
        </div>
        <AvatarInput
          name="avatar_id"
          avatar={deliveryman && deliveryman.avatar}
        />

        <Input name="name" label="Nome" placeholder="Juracy Kossatz" />

        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="jurabullet@hot.com"
        />
      </Form>
    </Content>
  );
}

DeliverymanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
