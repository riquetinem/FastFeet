import styled from 'styled-components/native';

import Button from '~/components/Button';

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
  justify-content: space-between;
  flex-direction: row;
`;

export const OptionButton = styled(Button).attrs({
  color: '#999999',
  background: '#ffffff',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  height: 100px;
  box-shadow: 0 1px 1px #000;
`;
