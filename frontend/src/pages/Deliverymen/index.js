import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdSearch, MdAdd, MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';

import { Container, Content, PageButtons } from './styles';
import ActionsDeliverymen from '~/components/ActionsDeliverymen';

import icon from '~/assets/icon-default.svg';

import api from '~/services/api';

export default function Deliverymens() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);

  const deleted = useSelector(state => state.deliverymen.deleted);

  useEffect(() => {
    async function loadDeliverymen() {
      const res = await api.get('/deliveryman', {
        params: { page, q: name },
      });

      const data = res.data.deliverymans.rows.map(response => ({
        ...response,
        idFormated: `00${response.id}`.slice(-2),
      }));

      setNext(res.data.deliverymans.next);
      setDeliverymen(data);
    }

    loadDeliverymen();
  }, [name, page, next, deleted]);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  return (
    <Container>
      <h2>Gerenciando entregadores</h2>
      <div id="first-row">
        <Form>
          <MdSearch size={16} color="#999999" />
          <Input
            name="delivery"
            placeholder="Buscar por entregadores"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </Form>

        <Link to="/new/deliveryman">
          <button type="button">
            <MdAdd size={30} color="#fff" /> Cadastrar
          </button>
        </Link>
      </div>
      <Content>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        {deliverymen.length > 0 ? (
          <tbody>
            {deliverymen.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td>#{deliveryman.idFormated}</td>
                <td>
                  <img
                    src={deliveryman.avatar ? deliveryman.avatar.url : icon}
                    alt="avatar"
                  />
                </td>
                <td>{deliveryman.name}</td>
                <td>{deliveryman.email}</td>
                <td>
                  <ActionsDeliverymen id={deliveryman.id} />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <h1>Nenhuma encomenda foi encontrada</h1>
        )}
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
