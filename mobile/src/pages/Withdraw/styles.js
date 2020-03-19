import styled from 'styled-components/native';
import { lighten } from 'polished';
import { RectButton } from 'react-native-gesture-handler';

export const LilBackground = styled.SafeAreaView`
  background: #7d40e7;
  display: flex;
  max-height: 70px;
`;

export const Container = styled.View`
  padding: 20px;
`;

export const ListHour = styled.FlatList.attrs({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
})`
  padding: 0 20px;
  height: 425px;
  align-self: center;
  background: #ffffff;
`;

export const Hour = styled(RectButton)`
  height: 50px;
  width: 100px;
  background: ${props =>
    props.disabled ? lighten(0.07, '#7d40e7') : '#7d40e7'};
  margin: 10px 20px;

  padding: 13px;
`;

export const TitleHour = styled.Text`
  font-size: 16px;
  align-self: center;
  color: #ffffff;
`;
