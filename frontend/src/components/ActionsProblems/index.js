import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { MdMoreHoriz, MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

import * as DeliveryActions from '~/store/modules/deliveries/actions';

import { Container, Badge, ActionList, Action } from './styles';

export default function ActionsProblems({ problem }) {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function deleteAction(idSelected) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(
      'Tem certeza que deseja cancelar está encomenda?'
    );

    if (!confirm) return;

    dispatch(DeliveryActions.cancelRequest(idSelected));
  }

  const ModalProblem = () => (
    <Popup
      trigger={
        <Action>
          <p>
            <MdRemoveRedEye color="#8E5BE8" size={15} /> Visualizar
          </p>
        </Action>
      }
      modal
    >
      {close => (
        <div className="modal">
          <button type="button" className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> {problem.delivery.product} </div>
          <div className="content">
            <h3>Descrição do problema</h3>
            <p>{problem.description}</p>
          </div>
        </div>
      )}
    </Popup>
  );

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        <ModalProblem />

        <Action onClick={() => deleteAction(problem.id)}>
          <p>
            <MdDeleteForever color="#DE3B3B" size={15} /> Cancelar Encomenda
          </p>
        </Action>
      </ActionList>
    </Container>
  );
}

ActionsProblems.propTypes = {
  problem: PropTypes.element.isRequired,
};
