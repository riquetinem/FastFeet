import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useRoute } from '@react-navigation/native';

import {
  LilBackground,
  Container,
  ListProblems,
  Problem,
  Description,
  DateProblem,
  NotFoundProblems,
} from './styles';

import api from '~/services/api';

export default function ListProblem() {
  const route = useRoute();
  const { delivery } = route.params;

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const res = await api.get(`/delivery/${delivery.id}/problems`);

      const data = res.data.map(r => ({
        ...r,
        formatData: format(parseISO(delivery.createdAt), 'dd/MM/yyyy', {
          locale: pt,
        }),
      }));

      setProblems(data);
    }

    loadProblems();
  }, [delivery.createdAt, delivery.id]);

  return (
    <LilBackground>
      <Container>
        {problems.length > 0 ? (
          <ListProblems
            data={problems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Problem>
                <Description numberOfLines={1} ellipsizeMode="tail">
                  {item.description}
                </Description>

                <DateProblem>{item.formatData}</DateProblem>
              </Problem>
            )}
          />
        ) : (
          <NotFoundProblems>Nenhum problema foi encontrado</NotFoundProblems>
        )}
      </Container>
    </LilBackground>
  );
}
