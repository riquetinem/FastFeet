import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  padding: 10px;
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 300px;
  height: 300px;
  border-radius: 150px;

  align-self: center;
  margin-top: 30px;
`;

export const Info = styled.View`
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export const ContentInfo = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #444444;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button).attrs({
  color: '#fff',
  background: '#E74040',
})``;
