import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { db } from '../services/firebase';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ListsScreen() {
  const [newList, setNewList] = useState('');
  const [lists, setLists] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'lists'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setLists(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddList = async () => {
    if (!newList.trim()) return;

    try {
      await addDoc(collection(db, 'lists'), {
        title: newList.trim(),
        createdAt: Date.now(),
        uid: user.uid,
      });
      setNewList('');
    } catch (err) {
      console.error('Error al agregar lista:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus listas</Text>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
      />

      <TextInput
        placeholder="Nombre de la lista"
        value={newList}
        onChangeText={setNewList}
        style={styles.input}
      />
      <Button title="Agregar lista" onPress={handleAddList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: { padding: 10, backgroundColor: '#eee', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
});
