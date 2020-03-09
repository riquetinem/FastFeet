import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

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

export default function Deliveries({ delivery, ...rest }) {
  delivery.formatedData = useMemo(() => {
    return format(parseISO(delivery.createdAt), 'dd/MM/yyyy', {
      locale: pt,
    });
  }, [delivery.createdAt]);
  return (
    <Delivery>
      <HeaderDelivery>
        <Icon name="local-shipping" color="#7D40E7" size={20} />
        <DeliveryTitle>Encomenda {delivery.id}</DeliveryTitle>
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
          <TextContent>{delivery.formatedData}</TextContent>
        </ContentFooter>
        <ContentFooter>
          <TitleContent>Cidade</TitleContent>
          <TextContent>{delivery.recipient.cidade}</TextContent>
        </ContentFooter>
        <ContentFooter>
          <OptionNavigation>Ver detalhes</OptionNavigation>
        </ContentFooter>
      </FooterDelivery>
    </Delivery>
  );
}

Deliveries.propTypes = {
  delivery: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};
