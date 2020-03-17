import styled from 'styled-components/native';
import { lighten } from 'polished';

export const Container = styled.View`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const SignImage = styled.Image.attrs({ resizeMode: 'contain' })`
  width: 350px;
  height: 500px;
`;

export const TakeAPicture = styled.TouchableOpacity`
  margin-top: -100px;
  margin-bottom: 70px;

  background: #0000004d;
  border-radius: 50px;

  padding: 15px;

  display: flex;
  align-content: center;

  justify-content: center;
`;

export const SendAPicture = styled.TouchableOpacity`
  background: ${props =>
    props.disabled ? lighten(0.07, '#7d40e7') : '#7d40e7'};
  border-radius: 4px;
  width: 350px;
  height: 50px;

  display: flex;

  justify-content: center;
`;

export const TitleButton = styled.Text`
  color: #ffffff;
  font-weight: bold;

  font-size: 18px;

  align-self: center;
`;
