import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut, deleteUser } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
import { auth } from '../services/firebase';
import { AuthContext } from '../context/AuthContext';

export default function SettingsScreen() {
  const { user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const load = async () => {
      const modo = await AsyncStorage.getItem('modoOscuro');
      if (modo === 'true') setDarkMode(true);
    };
    load();
  }, []);

  const toggleDarkMode = async () => {
    setDarkMode((prev) => {
      AsyncStorage.setItem('modoOscuro', String(!prev));
      return !prev;
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  const handleEliminarCuenta = async () => {
    Alert.alert(
      '¿Eliminar cuenta?',
      'Esta acción no se puede deshacer',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(auth.currentUser);
            } catch (e) {
              Alert.alert('Error', 'No se pudo eliminar la cuenta');
            }
          },
        },
      ]
    );
  };

  const programarRecordatorioSemanal = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '¡No olvides revisar tu lista!',
          body: 'Es buen momento para revisar tu lista semanal 🛒',
        },
        trigger: {
          weekday: 1, // Lunes
          hour: 10,
          minute: 0,
          repeats: true,
        },
      });

      Alert.alert('Recordatorio activado', 'Se notificará cada lunes a las 10am');
    } catch (e) {
      console.log('Error al programar notificación:', e);
    }
  };

  return (
    <View style={[styles.container, darkMode && { backgroundColor: '#222' }]}>
      <Text style={[styles.title, darkMode && { color: '#fff' }]}>Ajustes</Text>

      <View style={styles.row}>
        <Text style={[styles.text, darkMode && { color: '#fff' }]}>
          Modo oscuro
        </Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <Button title="Cerrar sesión" onPress={handleLogout} />

      <View style={{ marginTop: 12 }}>
        <Button
          title="Eliminar cuenta"
          onPress={handleEliminarCuenta}
          color="red"
        />
      </View>

      <View style={{ marginTop: 12 }}>
        <Button
          title="Activar recordatorio semanal"
          onPress={programarRecordatorioSemanal}
          color="#007AFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
  },
});
