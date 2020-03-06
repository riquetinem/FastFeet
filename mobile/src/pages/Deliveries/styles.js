import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.ScrollView`
  padding: 10px;
  flex: 1;
  background: #f5f5f5;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const Message = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export const Welcome = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  justify-content: center;
`;

export const Header = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const User = styled.View`
  display: flex;
  flex-direction: row;
`;

export const LogoutButton = styled(Button).attrs({
  color: '#fff',
  background: '#f5f5f5',
})`
  width: 30px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #444444;
  font-weight: bold;
`;

export const NavigationOptions = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TitleNavigation = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
`;

export const Options = styled.View`
  display: flex;
  flex-direction: row;
`;

export const OptionNavigation = styled(Button).attrs({
  color: '#f00',
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
