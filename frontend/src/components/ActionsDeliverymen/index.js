import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';

import * as DeliverymanActions from '~/store/modules/deliverymen/actions';

import history from '~/services/history';

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
      'Tem certeza que deseja deletar este entregador?'
    );

    if (!confirm) return;

    dispatch(DeliverymanActions.deleteRequest(idSelected));
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        <Action onClick={() => history.push(`/edit/deliveryman/${id}`)}>
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
