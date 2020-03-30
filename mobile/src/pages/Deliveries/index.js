/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  Header,
  User,
  Avatar,
  Welcome,
  Message,
  Title,
  LogoutButton,
  NavigationOptions,
  Options,
  OptionNavigation,
  TextNavigation,
  TitleNavigation,
  BodyDelivery,
  NotFoundDeliveries,
} from './styles';

import Delivery from '~/components/Delivery';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [menuSelected, setMenuSelected] = useState(true);

  const user = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDeliveries() {
      if (menuSelected) {
        const res = await api.get(`/deliveryman/${user.id}/deliveries/pending`);

        const data = res.data.map(response => ({
          ...response,
          idFormated: `00${response.id}`.slice(-2),
          endereco: `${response.recipient.rua}, ${response.recipient.numero}, ${response.recipient.cidade} - ${response.recipient.estado}, ${response.recipient.cep}`,
          retirada:
            response.start_date &&
            format(parseISO(response.start_date), 'dd/MM/yyyy', {
              locale: pt,
            }),
          entregue:
            response.end_date &&
            format(parseISO(response.end_date), 'dd/MM/yyyy', {
              locale: pt,
            }),
          status: response.end_date
            ? 'Entregue'
            : response.start_date
            ? 'Retirada'
            : 'Pendente',
        }));

        setDeliveries(data);
      } else {
        const res = await api.get(
          `/deliveryman/${user.id}/deliveries/delivered`
        );

        const data = res.data.map(response => ({
          ...response,
          idFormated: `00${response.id}`.slice(-2),
          endereco: `${response.recipient.rua}, ${response.recipient.numero}, ${response.recipient.cidade} - ${response.recipient.estado}, ${response.recipient.cep}`,
          retirada:
            response.start_date &&
            format(parseISO(response.start_date), 'dd/MM/yyyy', {
              locale: pt,
            }),
          entregue:
            response.end_date &&
            format(parseISO(response.end_date), 'dd/MM/yyyy', {
              locale: pt,
            }),
          status: response.end_date
            ? 'Entregue'
            : response.start_date
            ? 'Retirada'
            : 'Pendente',
        }));

        setDeliveries(data);
      }
    }

    loadDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuSelected]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <User>
          <Avatar
            source={{
              uri:
                user && user.avatar
                  ? user.avatar.url
                  : `https://api.adorable.io/avatars/285/${user &&
                      user.name}.png`,
            }}
          />
          <Welcome>
            <Message>Bem vindo de volta,</Message>
            <Title>{user && user.name}</Title>
          </Welcome>
        </User>

        <LogoutButton onPress={handleLogout}>
          <Icon name="exit-to-app" color="#E74040" size={20} />
        </LogoutButton>
      </Header>

      <NavigationOptions>
        <TitleNavigation>Entregas</TitleNavigation>

        <Options>
          <OptionNavigation onPress={() => setMenuSelected(true)}>
            <TextNavigation thisSelected={menuSelected ? '#7159c1' : '#999999'}>
              Pendentes
            </TextNavigation>
          </OptionNavigation>

          <OptionNavigation onPress={() => setMenuSelected(false)}>
            <TextNavigation thisSelected={menuSelected ? '#999999' : '#7159c1'}>
              Entregues
            </TextNavigation>
          </OptionNavigation>
        </Options>
      </NavigationOptions>

      {deliveries.length > 0 ? (
        <BodyDelivery
          data={deliveries}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Delivery delivery={item} />}
        />
      ) : (
        <NotFoundDeliveries>
          Nenhuma encomenda foi encontrada
        </NotFoundDeliveries>
      )}
    </Container>
  );
}
