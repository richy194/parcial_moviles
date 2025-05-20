import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  console.log('Usuario en AppNavigator:', user);

  return (
    <NavigationContainer>
      {user ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
