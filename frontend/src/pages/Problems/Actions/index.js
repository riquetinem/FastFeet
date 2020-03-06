import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdRemoveRedEye, MdDeleteForever } from 'react-icons/md';

import { Container, Badge, ActionList, Action } from './styles';

export default function ActionsProblems({ problem, onCancel }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
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

        <Action onClick={onCancel}>
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
  onCancel: PropTypes.element.isRequired,
};
