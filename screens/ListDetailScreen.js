import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListDetailScreen = ({ route }) => {
  const { list } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.title}</Text>
      <Text style={styles.content}>Detalle: {list.detail}</Text>
    </View>
  );
};

export default ListDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
  },
});