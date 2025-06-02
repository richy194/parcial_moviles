import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [cargando, setCargando] = useState(true);

  // Cargar nombre desde almacenamiento local al abrir
  useEffect(() => {
    const cargarNombre = async () => {
      try {
        const almacenado = await AsyncStorage.getItem(`nombre-${user.uid}`);
        if (almacenado) setNombre(almacenado);
      } catch (e) {
        console.log('Error al cargar el nombre:', e);
      } finally {
        setCargando(false);
      }
    };
    if (user) cargarNombre();
  }, [user]);

  // Guardar nombre actualizado
  const guardarNombre = async () => {
    try {
      await AsyncStorage.setItem(`nombre-${user.uid}`, nombre);
      Alert.alert('Nombre guardado correctamente');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el nombre');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.value}>{user?.email}</Text>

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Tu nombre"
      />
      <Button title="Guardar nombre" onPress={guardarNombre} />

      <View style={{ marginTop: 40 }}>
        <Button title="Cerrar sesión" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
  },
});
