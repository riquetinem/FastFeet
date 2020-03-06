import React, { useState, useEffect } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import Actions from './Actions';

import api from '~/services/api';

import { Container, Content, PageButtons } from './styles';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(false);

  async function loadProblems() {
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

  useEffect(() => {
    loadProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, next]);

  function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  async function handleCancel(id) {
    try {
      await api.delete(`/problem/${id}/cancel-delivery`);
      toast.success('Encomenda cancelada com sucesso!');
      loadProblems();
    } catch (error) {
      toast.error('Erro ao cancelar a encomenda!');
    }
  }

  return (
    <Container>
      <h2>Problemas na entrega</h2>

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
                  <Actions
                    problem={problem}
                    onCancel={() => handleCancel(problem.id)}
                  />
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
