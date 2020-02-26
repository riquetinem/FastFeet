/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdSearch, MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Content, PageButtons } from './styles';

import ActionsDeliveries from '~/components/ActionsDeliveries';
import Status from './Status';

import api from '~/services/api';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [next, setNext] = useState(false);
  const [page, setPage] = useState(1);
  const [product, setProduct] = useState('');

  const deleted = useSelector(state => state.deliveries.deleted);

  useEffect(() => {
    async function loadDeliveries() {
      const res = await api.get('/delivery', {
        params: { page, q: product },
      });

      const data = res.data.deliveries.rows.map(response => ({
        ...response,
        idFormated: `00${response.id}`.slice(-2),
        status: response.canceled_at
          ? 'Cancelado'
          : response.end_date
          ? 'Entregue'
          : response.start_date
          ? 'Retirada'
          : 'Pendente',
      }));

      setNext(res.data.deliveries.next);
      setDeliveries(data);
    }

    loadDeliveries();
    console.tron.log(product);
  }, [next, page, product, deleted]);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  return (
    <Container>
      <h2>Gerenciando encomendas</h2>
      <div id="first-row">
        <Form>
          <MdSearch size={16} color="#999999" />
          <Input
            name="delivery"
            placeholder="Buscar por encomendas"
            onChange={e => setProduct(e.target.value)}
            value={product}
          />
        </Form>

        <button type="button">
          <MdAdd size={30} color="#fff" /> Cadastrar
        </button>
      </div>
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
          {deliveries.length > 0 &&
            deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td>#{delivery.idFormated}</td>
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
                <td>{delivery.recipient.cidade}</td>
                <td>{delivery.recipient.estado}</td>
                <td>
                  <p>
                    <Status text={delivery.status} />
                  </p>
                </td>
                <td>
                  <ActionsDeliveries id={delivery.id} />
                </td>
              </tr>
            ))}
        </tbody>
        {deliveries.length === 0 && <h1>Nenhuma encomenda foi encontrada</h1>}
      </Content>
      <PageButtons>
        {page !== 1 ? (
          <button type="button" id="prev" onClick={handlePrev}>
            <MdChevronLeft size={20} color="#fff" />
          </button>
        ) : (
          <button type="button" id="thisDisable" disabled>
            <MdChevronLeft size={20} color="#fff" />
          </button>
        )}
        {next ? (
          <button type="button" id="next" onClick={handleNext}>
            <MdChevronRight size={20} color="#fff" />
          </button>
        ) : (
          <button type="button" id="thisDisable" disabled>
            <MdChevronRight size={20} color="#fff" />
          </button>
        )}
      </PageButtons>
    </Container>
  );
}
