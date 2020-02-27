import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

import ActionsProblems from '~/components/ActionsProblems';

import api from '~/services/api';

import { Container, Content, PageButtons } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);

  const canceled = useSelector(state => state.deliveries.canceled);

  useEffect(() => {
    async function loadRecipients() {
      const res = await api.get('/delivery/problems', {
        params: { page },
      });
      const data = res.data.problems.rows.map(response => ({
        ...response,
        idFormated: `${`00${response.delivery.id}`.slice(-2)} - ${
          response.delivery.product
        }`,
      }));

      setNext(res.data.problems.next);
      setProblems(data);
    }

    loadRecipients();
  }, [page, next, canceled]);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  return (
    <Container>
      <h2>Gerenciando destinatários</h2>

      <Content>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        {problems.length > 0 ? (
          <tbody>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td>#{problem.idFormated}</td>
                <td>{problem.description}</td>
                <td>
                  <ActionsProblems id={problem.id} />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <h1>Nenhum problema foi encontrado!</h1>
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
