import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { Background, Container, Form, FormInput, SubmitButton } from './styles';

export default function Login() {
  const [id, setId] = useState('');

  function handleSubmit() {
    console.tron.log(id);
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            keyboardType="numeric"
            autoCorret={false}
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setId}
          />

          <SubmitButton loading={false} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
