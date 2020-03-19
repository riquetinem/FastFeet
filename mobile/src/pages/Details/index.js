import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Card,
  Session,
  TittleSession,
  Title,
  TextContent,
  OptionButton,
  LilBackground,
  DataSession,
  Separator,
  ListButtons,
  TitleButton,
} from './styles';

export default function Details() {
  const route = useRoute();
  const { delivery } = route.params;
  const navigation = useNavigation();
  return (
    <LilBackground>
      <Card>
        <Session>
          <TittleSession>
            <Icon name="local-shipping" color="#7D40E7" size={20} /> Informações
            da entrega
          </TittleSession>

          <Title>DESTINATÁRIO</Title>
          <TextContent>{delivery.recipient.name}</TextContent>

          <Title>ENDEREÇO DE ENTREGA</Title>
          <TextContent>{delivery.endereco}</TextContent>

          <Title>PRODUTO</Title>
          <TextContent>{delivery.product}</TextContent>
        </Session>

        <Session>
          <TittleSession>
            <Icon name="event" color="#7D40E7" size={20} /> Situação da entrega
          </TittleSession>

          <Title>STATUS</Title>
          <TextContent>{delivery.status}</TextContent>

          <DataSession>
            <Separator>
              <Title>DATA DE RETIRADA</Title>
              <TextContent>
                {delivery.start_date ? delivery.retirada : '--/--/--'}
              </TextContent>
            </Separator>

            <Separator>
              <Title>DATA DE ENTREGA</Title>
              <TextContent>
                {delivery.end_date ? delivery.entregue : '--/--/--'}
              </TextContent>
            </Separator>
          </DataSession>
        </Session>

        <ListButtons>
          <OptionButton
            onPress={() => navigation.navigate('Problem', { delivery })}>
            <Icon name="highlight-off" color="#E74040" size={30} />
            <TitleButton>Informar Problema</TitleButton>
          </OptionButton>
          <OptionButton
            onPress={() => navigation.navigate('ListProblem', { delivery })}>
            <Icon name="info-outline" color="#E7BA40" size={30} />
            <TitleButton>Visualizar Problemas</TitleButton>
          </OptionButton>
          {delivery.status !== 'Pendente' ? (
            <OptionButton
              onPress={() => navigation.navigate('Confirm', { delivery })}>
              <Icon name="event-available" color="#7D40E7" size={30} />
              <TitleButton>Confirmar Entrega</TitleButton>
            </OptionButton>
          ) : (
            <OptionButton
              onPress={() => navigation.navigate('Withdraw', { delivery })}>
              <Icon name="play-circle-outline" color="#82BF18" size={30} />
              <TitleButton>Retirar Encomenda</TitleButton>
            </OptionButton>
          )}
        </ListButtons>
      </Card>
    </LilBackground>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
