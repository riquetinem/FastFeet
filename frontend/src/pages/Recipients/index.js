import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdSearch, MdAdd, MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import ActionsRecipients from '~/components/ActionsRecipients';

import api from '~/services/api';

import { Container, Content, PageButtons } from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);

  const deleted = useSelector(state => state.recipients.deleted);

  useEffect(() => {
    async function loadRecipients() {
      const res = await api.get('/recipient', {
        params: { page, q: name },
      });

      const data = res.data.recipients.rows.map(response => ({
        ...response,
        idFormated: `00${response.id}`.slice(-2),
        endereco: `${response.rua},
         ${response.numero},
         ${response.bairro} -
         ${response.cidade}`,
      }));

      setNext(res.data.recipients.next);
      setRecipients(data);
    }

    loadRecipients();
  }, [page, next, name, deleted]);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  return (
    <Container>
      <h2>Gerenciando destinatários</h2>
      <div id="first-row">
        <Form>
          <MdSearch size={16} color="#999999" />
          <Input
            name="name"
            placeholder="Buscar por destinatários"
            onChange={e => setName(e.target.value)}
            value={name}
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
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        {recipients.length > 0 ? (
          <tbody>
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td>#{recipient.idFormated}</td>
                <td>{recipient.name}</td>
                <td>{recipient.endereco}</td>
                <td>
                  <ActionsRecipients id={recipient.id} />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <h1>Nenhum destinatário foi encontrado</h1>
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
