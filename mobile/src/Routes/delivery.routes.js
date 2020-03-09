import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import Details from '~/pages/Details';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Deliveries}
      />
      {/* headerLeft: false  ---- para tirar o backbutton */}
      <Stack.Screen
        options={{
          title: 'Detalhes da encomenda',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7D40E7',
          },
        }}
        name="Details"
        component={Details}
      />
    </Stack.Navigator>
  );
}
