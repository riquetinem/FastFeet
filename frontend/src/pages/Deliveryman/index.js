import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import * as DeliverymanActions from '~/store/modules/deliverymen/actions';

import api from '~/services/api';

import AvatarInput from './AvatarInput';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  email: Yup.string()
    .email('Insira um e-mail válido!')
    .required('O nome é obrigatório!'),
  avatar_id: Yup.number(),
});

export default function Deliveryman({ match }) {
  const { id } = match.params;
  const [deliveryman, setDeliveryman] = useState('');

  const dispatch = useDispatch();

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
      dispatch(DeliverymanActions.addRequest(data));
    } else {
      data.id = id;
      dispatch(DeliverymanActions.updateRequest(data));
    }
  }

  return (
    <Container>
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

          <strong>Nome</strong>
          <Input name="name" placeholder="Juracy Kossatz" />

          <strong>Email</strong>
          <Input name="email" type="email" placeholder="jurabullet@hot.com" />
        </Form>
      </Content>
    </Container>
  );
}

Deliveryman.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
