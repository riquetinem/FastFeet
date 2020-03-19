import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '~/services/api';

import {
  LilBackground,
  Container,
  Form,
  FormInput,
  SubmitButton,
} from './styles';

export default function Problem() {
  const route = useRoute();
  const { delivery } = route.params;
  const navigation = useNavigation();

  const [description, setDescription] = useState('');

  async function handleSubmit() {
    console.tron.log(description);
    try {
      const res = await api.post(`/delivery/${delivery.id}/problems`, {
        description,
      });

      Alert.alert('Sucesso', 'Problema adicionado com sucesso!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Details', { delivery }),
        },
      ]);
    } catch (err) {
      Alert.alert('Falha', 'Houve um erro na adição do problema.');
    }
  }

  return (
    <LilBackground>
      <Container>
        <Form>
          <FormInput
            name="description"
            autoCorret
            placeholder="Inclua o problema que ocorreu na entrega"
            returnKeyType="send"
            multiline
            onSubmitEditing={handleSubmit}
            onChangeText={setDescription}
          />

          <SubmitButton onPress={handleSubmit}>Adicionar problema</SubmitButton>
        </Form>
      </Container>
    </LilBackground>
  );
}
