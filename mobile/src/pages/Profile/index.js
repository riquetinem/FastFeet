import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  Avatar,
  Info,
  Title,
  ContentInfo,
  LogoutButton,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  // TODO: Verificar o pq quando dar logout ele "redireciona" para a mesma pagina e fala que o "user.blabla is null"
  const user = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={{
          uri: user.avatar
            ? user.avatar.url
            : `https://api.adorable.io/avatars/285/${user.name}.png`,
        }}
      />

      <Info>
        <Title>Nome Completo</Title>
        <ContentInfo>{user.name}</ContentInfo>

        <Title>Email</Title>
        <ContentInfo>{user.email}</ContentInfo>

        <Title>Data de cadastro</Title>
        <ContentInfo>{user.createdAt}</ContentInfo>
      </Info>

      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
