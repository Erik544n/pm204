import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_URL, TUNNEL_HEADERS } from '../config';

export default function ActualizarUsuariosScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params.id;
  const [nombre, setNombre] = useState(params.nombre || '');
  const [edad, setEdad] = useState(params.edad ? String(params.edad) : '');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (params.nombre) setNombre(params.nombre);
    if (params.edad) setEdad(String(params.edad));
  }, [params.nombre, params.edad]);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarCambios = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Campos vacíos', 'Por favor complete todos los campos.');
      return;
    }

    try {
      setCargando(true);
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: TUNNEL_HEADERS,
        body: JSON.stringify({
          nombre: nombre.trim(),
          edad: Number(edad),
        }),
      });

      const datos = await respuesta.json().catch(() => ({}));

      if (respuesta.ok) {
        mostrarMensaje('Éxito', 'Usuario actualizado correctamente.');
        router.dismissTo('/(tabs)/consulta');
      } else {
        mostrarMensaje('Error', datos.detail || 'No fue posible actualizar el usuario.');
      }
    } catch (error) {
      console.log('Error al actualizar usuario:', error);
      mostrarMensaje('Error', 'No fue posible conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tituloHeader}>Actualizar Usuario</Text>

        <View style={styles.campoGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre del usuario"
          />
        </View>

        <View style={styles.campoGroup}>
          <Text style={styles.label}>Edad</Text>
          <TextInput
            style={styles.input}
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
            placeholder="Edad del usuario"
          />
        </View>

        <Pressable
          style={[styles.botonGuardar, cargando && styles.botonDeshabilitado]}
          onPress={guardarCambios}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.textoBotonGuardar}>Guardar cambios</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tituloHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },
  campoGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FAFAFA',
    fontSize: 15,
    color: '#111827',
  },
  botonGuardar: {
    backgroundColor: '#EAB308',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  botonDeshabilitado: {
    opacity: 0.7,
  },
  textoBotonGuardar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
