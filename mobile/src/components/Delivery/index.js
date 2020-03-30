import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import {
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
  OptionNavigation,
} from './styles';

export default function Deliveries({ delivery }) {
  delivery.formatedData = useMemo(() => {
    return format(parseISO(delivery.createdAt), 'dd/MM/yyyy', {
      locale: pt,
    });
  }, [delivery.createdAt]);

  const navigation = useNavigation();

  return (
    <Delivery>
      <HeaderDelivery>
        <Icon name="local-shipping" color="#7D40E7" size={20} />
        <DeliveryTitle>Encomenda {delivery.idFormated}</DeliveryTitle>
      </HeaderDelivery>

      <BodyDelivery>
        <Progress>
          <Ball
            status={
              delivery.status === 'Entregue' ||
              delivery.status === 'Retirada' ||
              delivery.status === 'Pendente'
            }
          />
          <Line />
          <Ball
            status={
              delivery.status === 'Entregue' || delivery.status === 'Retirada'
            }
          />
          <Line />
          <Ball status={delivery.status === 'Entregue'} />
        </Progress>
        <Legend>
          <TitleContent>Em espera</TitleContent>
          <TitleContent>Retirada</TitleContent>
          <TitleContent>Entregue</TitleContent>
        </Legend>
      </BodyDelivery>

      <FooterDelivery>
        <ContentFooter>
          <TitleContent>Data</TitleContent>
          <TextContent>{delivery.formatedData}</TextContent>
        </ContentFooter>
        <ContentFooter>
          <TitleContent>Cidade</TitleContent>
          <TextContent>{delivery.recipient.cidade}</TextContent>
        </ContentFooter>
        <ContentFooter>
          <OptionNavigation
            onPress={() => navigation.navigate('Details', { delivery })}>
            Ver detalhes
          </OptionNavigation>
        </ContentFooter>
      </FooterDelivery>
    </Delivery>
  );
}

Deliveries.propTypes = {
  delivery: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};
