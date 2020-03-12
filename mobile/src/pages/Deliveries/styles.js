import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
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

export const OptionNavigation = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const TextNavigation = styled.Text`
  color: ${props => props.thisSelected};
  text-decoration: ${props =>
    props.thisSelected === '#999999' ? 'none' : 'underline'};
`;

export const BodyDelivery = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const NotFoundDeliveries = styled.Text`
  align-self: center;
  margin-top: 200px;
  font-size: 20px;
  color: rgba(220, 42, 12, 0.8);
`;
