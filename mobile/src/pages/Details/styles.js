import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const LilBackground = styled.SafeAreaView`
  background: #7d40e7;
  max-height: 70px;
  display: flex;
`;

export const Card = styled.SafeAreaView`
  margin: 20px 10px;
  background: #fff;
  padding: 15px;
  height: 520px;
`;

export const Session = styled.View`
  margin-bottom: 20px;
`;

export const TittleSession = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const Title = styled.Text`
  color: #999999;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
`;

export const TextContent = styled.Text`
  margin-bottom: 15px;
  font-size: 14px;
`;

export const DataSession = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Separator = styled.View``;

export const ListButtons = styled.View`
  display: flex;
  flex-direction: row;
`;

export const TitleButton = styled.Text`
  color: #999999;
  font-size: 18px;
  margin-left: 25px;
  width: 100px;
`;

export const OptionButton = styled(RectButton)`
  background: #ffffff;

  margin-left: -10px;
  margin-right: 5px;

  display: flex;
  width: 120px;
  align-items: center;
`;
