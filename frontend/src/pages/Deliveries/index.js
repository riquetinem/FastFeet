/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { Container, Content } from './styles';
import Actions from '~/components/Actions';

import api from '~/services/api';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const res = await api.get('/delivery');

      const data = res.data.map(response => ({
        ...response,
        id: `00${response.id}`.slice(-2),
        status: response.canceled_at
          ? 'Cancelado'
          : response.end_date
          ? 'Entregue'
          : response.start_date
          ? 'Retirada'
          : 'Pendente',
        // canceled: !!response.canceled_at,
        // deliveried: !!response.end_date,
        // retired: !!response.start_date,
      }));

      setDeliveries(data);
    }

    loadDeliveries();
  }, []);

  return (
    <Container>
      <h2>Gerenciando encomendas</h2>
      <Content>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map(delivery => (
            <tr key={delivery.id}>
              <td>#{delivery.id}</td>
              <td>{delivery.recipient.name}</td>
              <td>
                <ul>
                  <li>
                    <img
                      src={
                        delivery.deliveryman.avatar
                          ? delivery.deliveryman.avatar.url
                          : 'https://api.adorable.io/avatars/285/seeea.png'
                      }
                      alt="avatar"
                    />
                  </li>
                  <li> {delivery.deliveryman.name}</li>
                </ul>
              </td>
              <td>São Paulo</td>
              <td>São Paulo</td>
              <td>
                <p canceled={delivery.status}>{delivery.status}</p>
              </td>
              <td>
                <Actions />
              </td>
            </tr>
          ))}
        </tbody>
      </Content>
    </Container>
  );
}
