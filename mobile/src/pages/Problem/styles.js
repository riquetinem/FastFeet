import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const LilBackground = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background: #7d40e7;
  max-height: 70px;
  display: flex;
`;

export const Container = styled.View``;

export const Form = styled.View`
  align-self: stretch;
  margin: 30px 20px 0 20px;
`;

export const FormInput = styled.TextInput.attrs({
  textAlignVertical: 'top',
  placeholderTextColor: '#999999',
})`
  margin-bottom: 30px;
  background: #fff;
  padding: 10px;
  height: 300px;
  font-size: 18px;
`;

export const SubmitButton = styled(Button).attrs({
  color: '#fff',
  background: '#7D40E7',
})`
  margin-top: 5px;
  margin: 0 20px;
`;
