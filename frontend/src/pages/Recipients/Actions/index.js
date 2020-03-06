import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz, MdCreate, MdDeleteForever } from 'react-icons/md';

import history from '~/services/history';

import { Container, Badge, ActionList, Action } from './styles';

export default function ActionsRecipients({ id, onDelete }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz size={20} color="#666" />
      </Badge>

      <ActionList visible={visible}>
        <Action onClick={() => history.push(`/edit/recipient/${id}`)}>
          <p>
            <MdCreate color="#4D85EE" size={15} /> Editar
          </p>
        </Action>
        <Action onClick={onDelete}>
          <p>
            <MdDeleteForever color="#DE3B3B" size={15} /> Excluir
          </p>
        </Action>
      </ActionList>
    </Container>
  );
}

ActionsRecipients.propTypes = {
  id: PropTypes.element.isRequired,
  onDelete: PropTypes.element.isRequired,
};
