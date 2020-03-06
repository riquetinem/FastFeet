import React from 'react';
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
  TitleNavigation,
  Delivery,
  DeliveryTitle,
  HeaderDelivery,
  FooterDelivery,
  ContentFooter,
  TitleContent,
  TextContent,
  BodyDelivery,
  Line,
  Ball,
  Progress,
  Legend,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
// TODO: SEPARAR EM COMPONENTS PARA A PAGINA NAO FICAR TAO GRANDE
export default function Deliveries() {
  const user = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header>
        <User>
          <Avatar
            source={{
              uri: user.avatar
                ? user.avatar.url
                : `https://api.adorable.io/avatars/285/${user.name}.png`,
            }}
          />
          <Welcome>
            <Message>Bem vindo de volta,</Message>
            <Title>{user.name}</Title>
          </Welcome>
        </User>

        <LogoutButton onPress={handleLogout}>
          <Icon name="exit-to-app" color="#E74040" size={20} />
        </LogoutButton>
      </Header>

      <NavigationOptions>
        <TitleNavigation>Entregas</TitleNavigation>

        <Options>
          <OptionNavigation>Pendentes</OptionNavigation>

          <OptionNavigation>Entregues</OptionNavigation>
        </Options>
      </NavigationOptions>

      <Delivery>
        <HeaderDelivery>
          <Icon name="local-shipping" color="#7D40E7" size={20} />
          <DeliveryTitle>Encomenda 01</DeliveryTitle>
        </HeaderDelivery>

        <BodyDelivery>
          <Progress>
            <Ball status />
            <Line />
            <Ball status />
            <Line />
            <Ball />
          </Progress>
          <Legend>
            <TitleContent>Aguardando Retirada</TitleContent>
            <TitleContent>Retirada</TitleContent>
            <TitleContent>Entregue</TitleContent>
          </Legend>
        </BodyDelivery>

        <FooterDelivery>
          <ContentFooter>
            <TitleContent>Data</TitleContent>
            <TextContent>14/01/2020</TextContent>
          </ContentFooter>
          <ContentFooter>
            <TitleContent>Cidade</TitleContent>
            <TextContent>Diadema</TextContent>
          </ContentFooter>
          <ContentFooter>
            <OptionNavigation>Ver detalhes</OptionNavigation>
          </ContentFooter>
        </FooterDelivery>
      </Delivery>
    </Container>
  );
}
