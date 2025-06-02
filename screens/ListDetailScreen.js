import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase';

export default function ListDetailScreen({ route }) {
  const { list } = route.params;
  const [producto, setProducto] = useState('');
  const [productos, setProductos] = useState([]);

  const refProductos = collection(db, 'lists', list.id, 'productos');

  useEffect(() => {
    const unsubscribe = onSnapshot(refProductos, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) =>
        data.push({ id: doc.id, ...doc.data() })
      );
      setProductos(data);
    });

    return () => unsubscribe();
  }, []);

  const agregarProducto = async () => {
    if (!producto.trim()) return;

    await addDoc(refProductos, {
      nombre: producto.trim(),
      comprado: false,
      creado: Date.now(),
    });

    setProducto('');
  };

  const toggleComprado = async (item) => {
    const ref = doc(db, 'lists', list.id, 'productos', item.id);
    await updateDoc(ref, {
      comprado: !item.comprado,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Agregar producto"
          value={producto}
          onChangeText={setProducto}
          style={styles.input}
        />
        <Button title="Agregar" onPress={agregarProducto} />
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => toggleComprado(item)}
          >
            <Text
              style={[
                styles.productoTexto,
                item.comprado && styles.comprado,
              ]}
            >
              {item.nombre}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#777' }}>
            No hay productos aún
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  inputContainer: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  item: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  productoTexto: { fontSize: 16 },
  comprado: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
