import React from 'react';
import {
  MdMoreHoriz,
  MdRemoveRedEye,
  MdCreate,
  MdDeleteForever,
} from 'react-icons/md';
import { Container, Content } from './styles';

export default function Deliveries() {
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
          <tr>
            <td>#02</td>
            <td>Henrique</td>
            <td>José</td>
            <td>São Paulo</td>
            <td>São Paulo</td>
            <td>ENTREGUE</td>
            <td>
              <MdMoreHoriz />
            </td>
          </tr>

          <tr>
            <td>#03</td>
            <td>Henrique</td>
            <td>José</td>
            <td>São Paulo</td>
            <td>São Paulo</td>
            <td>ENTREGUE</td>
            <td>
              <MdMoreHoriz />
            </td>
          </tr>

          <tr>
            <td>#04</td>
            <td>Henrique</td>
            <td>José</td>
            <td>São Paulo</td>
            <td>São Paulo</td>
            <td>ENTREGUE</td>
            <td>
              <MdMoreHoriz />
            </td>
          </tr>

          <tr>
            <td>#05</td>
            <td>Henrique</td>
            <td>José</td>
            <td>São Paulo</td>
            <td>São Paulo</td>
            <td>ENTREGUE</td>
            <td>
              <MdMoreHoriz />
            </td>
          </tr>

          <tr>
            <td>#06</td>
            <td>Henrique</td>
            <td>José</td>
            <td>São Paulo</td>
            <td>São Paulo</td>
            <td>ENTREGUE</td>
            <td>
              <MdMoreHoriz />
            </td>
          </tr>

          <tr>
            <td>#07</td>
            <td>Henrique</td>
            <td>José</td>
            <td>São Paulo</td>
            <td>São Paulo</td>
            <td>ENTREGUE</td>
            <td>
              <MdMoreHoriz />
            </td>
          </tr>
        </tbody>
      </Content>
    </Container>
  );
}
