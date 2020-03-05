import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '~/pages/Login';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
