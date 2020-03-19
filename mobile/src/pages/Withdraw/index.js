import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

import { LilBackground, Container, ListHour, Hour, TitleHour } from './styles';

import api from '~/services/api';

export default function Withdraw() {
  const route = useRoute();
  const { delivery } = route.params;
  const navigation = useNavigation();

  const [hour, setHour] = useState([]);
  const user = useSelector(state => state.user.profile);

  useEffect(() => {
    async function loadHours() {
      const res = await api.get('/deliveryman/available');

      setHour(res.data);
    }

    loadHours();
  }, []);

  function handleSubmitData(date, time) {
    Alert.alert('Aviso', `Deseja realmente retirar a encomenda as ${time}`, [
      {
        text: 'Cancelar',
        styled: 'Cancel',
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          try {
            const res = await api.post(
              `/delivery/${delivery.id}/start/${user.id}`,
              {
                date,
              }
            );

            Alert.alert('Sucesso', 'Encomenda retirada com sucesso', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Home'),
              },
            ]);
          } catch (err) {
            Alert.alert('Falha', 'Houve um erro na retirada da encomenda.');
          }
        },
      },
    ]);
  }

  return (
    <LilBackground>
      <Container>
        <ListHour
          data={hour}
          keyExtractor={item => String(item.time)}
          renderItem={({ item }) => (
            <Hour
              disabled={!item.available}
              onPress={() => {
                if (item.available) handleSubmitData(item.value, item.time);
              }}>
              <TitleHour>{item.time}</TitleHour>
            </Hour>
          )}
        />
      </Container>
    </LilBackground>
  );
}
