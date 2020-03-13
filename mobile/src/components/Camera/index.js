import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import api from '~/services/api';

export default function Camera({ delivery }) {
  const [signature, setSignature] = useState('');

  const user = useSelector(state => state.user.profile);

  function openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      image.name = 'signature_image';
      setSignature(image);
    });
  }

  function sendPhotoTest() {
    Alert.alert(
      'Aviso!',
      'Deseja realmente confirmar a entrega da encomenda?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
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

              console.tron.log(data);

              const res = await api.put(
                `/delivery/${delivery.id}/end/${user.id}`,
                data
              );

              Alert.alert('Sucesso', 'Confirmação feita com sucesso');
            } catch (err) {
              Alert.alert('Falha', 'Houve um erro na confirmação');
            }
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Image
        style={{ width: 300, height: 400 }}
        source={{
          uri:
            signature !== ''
              ? `data:${signature.mime};base64,${signature.data}`
              : 'https://i.imgur.com/4CAVsNx.png',
        }}
      />

      <TouchableOpacity onPress={openCamera}>
        <Text>aaa</Text>
      </TouchableOpacity>

      {signature !== '' && (
        <TouchableOpacity onPress={sendPhotoTest}>
          <Text>sendPhotoTest</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

Camera.propTypes = {
  delivery: PropTypes.object.isRequired,
};
