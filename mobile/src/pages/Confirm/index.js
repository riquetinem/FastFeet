import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

// import { Container } from './styles';
import Camera from '~/components/Camera';

export default function Confirm() {
  const route = useRoute();
  const { delivery } = route.params;

  return <Camera delivery={delivery} />;
}
