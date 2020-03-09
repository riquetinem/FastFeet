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
} from './styles';

export default function Details() {
  const route = useRoute();
  const { delivery } = route.params;
  return (
    <Card>
      <Session>
        <TittleSession>ICON - Informações da entrega</TittleSession>

        <Title>DESTINATÁRIO</Title>
        <TextContent>{delivery.recipient.name}</TextContent>

        <Title>ENDEREÇO DE ENTREGA</Title>
        <TextContent>{delivery.recipient.endereco}</TextContent>

        <Title>PRODUTO</Title>
        <TextContent>{delivery.product}</TextContent>
      </Session>

      <Session>
        <TittleSession>ICON - Situação da entrega</TittleSession>

        <Title>STATUS</Title>
        <TextContent>{delivery.status}</TextContent>

        <Title>DATA DE RETIRADA</Title>
        <TextContent>
          {delivery.start_date ? delivery.start_date : '--/--/--'}
        </TextContent>

        <Title>DATA DE ENTREGA</Title>
        <TextContent>
          {delivery.end_date ? delivery.end_date : '--/--/--'}
        </TextContent>
      </Session>

      <OptionButton>ICON - Informar Problema</OptionButton>
      <OptionButton>ICON - Visualizar Problemas</OptionButton>
      <OptionButton>ICON - Confirmar Entrega</OptionButton>
    </Card>
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
