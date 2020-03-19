import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import Details from '~/pages/Details';
import Problem from '~/pages/Problem';
import ListProblem from '~/pages/ListProblem';
import Confirm from '~/pages/Confirm';
import Withdraw from '~/pages/Withdraw';

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
            elevation: 0,
          },
        }}
        name="Details"
        component={Details}
      />

      <Stack.Screen
        options={{
          title: 'Informar problema',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
          },
        }}
        name="Problem"
        component={Problem}
      />

      <Stack.Screen
        options={{
          title: 'Visualizar problemas',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
          },
        }}
        name="ListProblem"
        component={ListProblem}
      />

      <Stack.Screen
        options={{
          title: 'Confirmar entrega',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
          },
        }}
        name="Confirm"
        component={Confirm}
      />

      <Stack.Screen
        options={{
          title: 'Retirar encomenda',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
          },
        }}
        name="Withdraw"
        component={Withdraw}
      />
    </Stack.Navigator>
  );
}
