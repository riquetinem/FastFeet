import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

// import { store, persistor } from './store';
import './config/ReactotronConfig';

import Routes from './routes';

export default function Index() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7" />
      <Routes />
    </NavigationContainer>
  );
}
