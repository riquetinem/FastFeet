import React, { useState } from 'react';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import api from '~/services/api';

import { Container, Badge, ActionList, Action } from './styles';

export default function Actions() {
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
        <Action>
          <p>
            <MdRemoveRedEye color="#8E5BE8" size={15} /> Visualizar
          </p>
        </Action>
        <Action>
          <p>
            <MdCreate color="#4D85EE" size={15} /> Editar
          </p>
        </Action>
        <Action>
          <p>
            <MdDeleteForever color="#DE3B3B" size={15} /> Excluir
          </p>
        </Action>
      </ActionList>
    </Container>
  );
}
