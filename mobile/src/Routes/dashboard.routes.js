import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import PropTypes from 'prop-types';

import DeliveryRoutes from './delivery.routes';

import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#7D40E7',
          inactiveTintColor: '#999999',
        }}>
        <Tab.Screen
          name="Entregas"
          options={{
            tabBarLabel: 'Entregas',
            tabBarIcon: ({ color, size }) => (
              <Icon name="reorder" color={color} size={size} />
            ),
          }}
          component={DeliveryRoutes}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Meu Perfil',
            tabBarIcon: ({ color, size }) => (
              <Icon name="account-circle" color={color} size={size} />
            ),
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}
