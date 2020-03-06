/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';

import history from '~/services/history';

import { Container, Badge, ActionList, Action } from './styles';

export default function ActionsDeliveries({ delivery, onDelete }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  const ModalDelivery = () => (
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
          <div className="header"> {delivery.product} </div>
          <div className="content">
            <h3>Informações da encomenda</h3>
            <p>
              {delivery.recipient.rua}, {delivery.recipient.numero}
              {delivery.recipient.complemento &&
                `(${delivery.recipient.complemento})`}
              , {delivery.recipient.bairro}, {delivery.recipient.cidade} -{' '}
              {delivery.recipient.estado}, {delivery.recipient.cep}
            </p>

            <hr />

            <h3>Datas</h3>
            <p>
              <b>Retirada: </b>
              {delivery.initialDate
                ? delivery.initialDate
                : 'A encomenda ainda não foi retirado'}
            </p>
            <p>
              <b>Entrega: </b>{' '}
              {delivery.canceled_at
                ? `A encomenda foi cancelada (${delivery.canceledDate})`
                : delivery.finalDate
                ? delivery.finalDate
                : 'A encomenda ainda não foi entregue'}
            </p>

            {delivery.finalDate && (
              <>
                <hr />
                <h3>Assinatura do destinatário</h3>
                <img src={delivery.signature.url} alt="Assinatura" />
              </>
            )}
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
        <ModalDelivery />

        <Action onClick={() => history.push(`/edit/delivery/${delivery.id}`)}>
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

ActionsDeliveries.propTypes = {
  delivery: PropTypes.element.isRequired,
  onDelete: PropTypes.element.isRequired,
};
