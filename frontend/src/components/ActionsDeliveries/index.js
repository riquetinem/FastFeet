import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import history from '~/services/history';

import * as DeliveryActions from '~/store/modules/deliveries/actions';

import { Container, Badge, ActionList, Action } from './styles';

export default function ActionsDeliveries({ id }) {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function deleteAction(idSelected) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Tem certeza que deseja deletar está encomenda?'
    );

    if (!confirm) return;

    dispatch(DeliveryActions.deleteRequest(idSelected));
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        <Action>
          <p>
            <MdRemoveRedEye color="#8E5BE8" size={15} /> Visualizar
          </p>
        </Action>
        <Action onClick={() => history.push(`/edit/delivery/${id}`)}>
          <p>
            <MdCreate color="#4D85EE" size={15} /> Editar
          </p>
        </Action>
        <Action onClick={() => deleteAction(id)}>
          <p>
            <MdDeleteForever color="#DE3B3B" size={15} /> Excluir
          </p>
        </Action>
      </ActionList>
    </Container>
  );
}

ActionsDeliveries.propTypes = {
  id: PropTypes.element.isRequired,
};
