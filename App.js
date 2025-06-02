import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    const configurarNotificaciones = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          console.log('Permiso de notificación denegado');
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Token de notificación:', token);
      } else {
        console.log('Las notificaciones solo funcionan en dispositivos físicos');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    };

    configurarNotificaciones();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}






