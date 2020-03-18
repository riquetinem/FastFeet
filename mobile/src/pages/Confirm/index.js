import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  Container,
  SignImage,
  TakeAPicture,
  SendAPicture,
  TitleButton,
} from './styles';

import api from '~/services/api';

export default function Confirm() {
  const route = useRoute();
  const { delivery } = route.params;
  const navigation = useNavigation();

  const [signature, setSignature] = useState('');
  const user = useSelector(state => state.user.profile);

  function openCamera() {
    ImagePicker.openCamera({
      width: 350,
      height: 500,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      image.name = 'signature_image';
      setSignature(image);
    });
  }

  function sendImage() {
    Alert.alert(
      'Aviso!',
      'Deseja realmente confirmar a entrega da encomenda?',
      [
        {
          text: 'Cancelar',
          styled: 'Cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              const file = {
                uri: signature.path,
                type: signature.mime,
                name: signature.name,
                size: signature.size,
              };

              const data = new FormData();
              data.append('file', file);

              const res = await api.put(
                `/delivery/${delivery.id}/end/${user.id}`,
                data
              );

              Alert.alert('Sucesso', 'Confirmação feita com sucesso', [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('Home'),
                },
              ]);
            } catch (err) {
              Alert.alert('Falha', 'Houve um erro na confirmação.');
            }
          },
        },
      ]
    );
  }

  return (
    <Container>
      <SignImage
        source={{
          uri:
            signature !== ''
              ? `data:${signature.mime};base64,${signature.data}`
              : 'https://i.imgur.com/4CAVsNx.png',
        }}
      />

      <TakeAPicture onPress={openCamera}>
        <Icon name="camera-alt" size={40} color="#ffffff" />
      </TakeAPicture>

      <SendAPicture disabled={signature === ''} onPress={sendImage}>
        <TitleButton>Enviar</TitleButton>
      </SendAPicture>
    </Container>
  );
}
