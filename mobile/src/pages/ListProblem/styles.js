import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const LilBackground = styled.SafeAreaView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #7d40e7;
  display: flex;
  max-height: 70px;
`;

export const Container = styled.View`
  padding: 20px;
`;

// styled.FlatList.attrs({
//  showsVerticalScrollIndicator: false,
// })

export const ListProblems = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  height: 500px;
`;

export const Problem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 50px;
`;

export const Description = styled.Text`
  color: #999999;
  font-size: 16px;
  width: 230px;
`;

export const DateProblem = styled.Text`
  color: #c1c1c1;
`;

export const NotFoundProblems = styled.Text`
  align-self: center;
  margin-top: 300px;
  font-weight: bold;
  font-size: 20px;
  color: rgba(220, 42, 12, 0.8);
`;
