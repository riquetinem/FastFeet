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
  const user = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Avatar
        source={{
          uri:
            user && user.avatar
              ? user.avatar.url
              : `https://api.adorable.io/avatars/285/${user && user.name}.png`,
        }}
      />

      <Info>
        <Title>Nome Completo</Title>
        <ContentInfo>{user && user.name}</ContentInfo>

        <Title>Email</Title>
        <ContentInfo>{user && user.email}</ContentInfo>

        <Title>Data de cadastro</Title>
        <ContentInfo>{user && user.createdAt}</ContentInfo>
      </Info>

      <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
    </Container>
  );
}
