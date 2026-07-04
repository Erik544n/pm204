import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Alert
} from 'react-native';

export default function SplashScreen() {
  const [isSplash, setIsSplash] = useState(true);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [loading, setLoading] = useState(false);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAgregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Campos incompletos', 'Por favor, llena todos los campos antes de agregar el libro.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((librosActuales) => [nuevoLibro, ...librosActuales]);

      setTitulo('');
      setAutor('');
      setGenero('');
      setLoading(false);

      Alert.alert(`El libro "${nuevoLibro.titulo}" fue agregado correctamente.`);
    }, 4000);
  };

  if (isSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}> Mi Biblioteca App</Text>
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/a.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Registro de Libros</Text>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#888"
            value={titulo}
            onChangeText={setTitulo}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#888"
            value={autor}
            onChangeText={setAutor}
            editable={!loading}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#888"
            value={genero}
            onChangeText={setGenero}
            editable={!loading}
          />

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text style={styles.loadingText}>Guardando libro...</Text>
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
              ]}
              onPress={handleAgregarLibro}
            >
              <Text style={styles.buttonText}>Agregar libro</Text>
            </Pressable>
          )}
        </View>

        <Text style={styles.sectionTitle}>Libros Guardados ({libros.length})</Text>
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.libroItem}>
              <Text style={styles.libroTitulo}>{item.titulo}</Text>
              <Text style={styles.libroDetalle}>Por: {item.autor} | Género: {item.genero}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay libros registrados todavía.</Text>
          }
          style={styles.list}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  button: {
    backgroundColor: '#1e3799',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonPressed: {
    backgroundColor: '#0c2461',
    opacity: 0.9,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  loadingText: {
    marginTop: 5,
    color: '#0000ff',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  libroItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  libroTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  libroDetalle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#ddd',
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});