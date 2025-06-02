// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

