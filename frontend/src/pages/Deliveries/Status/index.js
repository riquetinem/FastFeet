/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { MdFiberManualRecord } from 'react-icons/md';
import { lighten } from 'polished';

import { Container, Content } from './styles';

export default function Status({ text }) {
  const color =
    text === 'Cancelado'
      ? '#DE3B3B'
      : text === 'Entregue'
      ? '#2CA42B'
      : text === 'Retirada'
      ? '#4D85EE'
      : '#C1BC35';

  const background =
    text === 'Cancelado'
      ? lighten('0.38', '#DE3B3B')
      : text === 'Entregue'
      ? lighten('0.45', '#2CA42B')
      : text === 'Retirada'
      ? lighten('0.3', '#4D85EE')
      : lighten('0.45', '#C1BC35');

  return (
    <Container>
      <Content color={color} background={background}>
        <MdFiberManualRecord size={15} color={color} />
        <strong>{text}</strong>
      </Content>
    </Container>
  );
}

Status.propTypes = {
  text: PropTypes.string.isRequired,
};
