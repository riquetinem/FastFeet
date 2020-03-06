import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import Login from '~/pages/Login';

import DashboardRoutes from './dashboard.routes';

const Stack = createStackNavigator();

export default function Routes({ signed }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#7D40E7' },
          headerTintColor: '#fff',
        }}>
        {signed ? (
          <Stack.Screen
            name="Dashboard"
            options={{ headerShown: false }}
            component={DashboardRoutes}
          />
        ) : (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

Routes.propTypes = {
  signed: PropTypes.bool.isRequired,
};
