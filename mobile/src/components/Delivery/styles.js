import styled from 'styled-components/native';
import Button from '~/components/Button';

export const OptionNavigation = styled(Button).attrs({
  color: '#7159c1',
  background: '#f5f5f5',
})`
  margin-left: 10px;
`;

export const Delivery = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const HeaderDelivery = styled.View`
  display: flex;
  flex-direction: row;
`;

export const DeliveryTitle = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  margin-left: 10px;
`;

export const BodyDelivery = styled.View`
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const Progress = styled.View`
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Legend = styled.View`
  padding: 0 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Line = styled.View`
  background: #7159c1;
  flex: 1;
  height: 3px;
`;

export const Ball = styled.View`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  background: ${props => (props.status ? '#7159c1' : '#f5f5f5')};
  border: 1px solid #7159c1;
`;

export const FooterDelivery = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentFooter = styled.View``;

export const TitleContent = styled.Text`
  color: #999999;
  font-size: 12px;
`;

export const TextContent = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
