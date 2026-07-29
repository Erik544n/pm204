import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { API_URL, TUNNEL_HEADERS } from '../config';

export default function DetallesUsuariosScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const id = params.id;
  const nombre = params.nombre || '';
  const edad = params.edad || '';

  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const irAActualizar = () => {
    router.push({
      pathname: '/actualizar',
      params: { id, nombre, edad },
    });
  };

  const confirmarEliminacion = async () => {
    try {
      setEliminando(true);
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: TUNNEL_HEADERS,
      });

      if (respuesta.ok) {
        setModalVisible(false);
        mostrarMensaje('Éxito', 'Usuario eliminado correctamente.');
        router.back();
      } else {
        const errorData = await respuesta.json().catch(() => ({}));
        mostrarMensaje('Error', errorData.detail || 'No se pudo eliminar el usuario.');
      }
    } catch (error) {
      console.log('Error al eliminar usuario:', error);
      mostrarMensaje('Error', 'No fue posible conectar con el servidor.');
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.tituloHeader}>Detalles del Usuario</Text>

        <View style={styles.campoGroup}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.valorNombre}>{nombre}</Text>
        </View>

        <View style={styles.linea} />

        <View style={styles.campoGroup}>
          <Text style={styles.label}>Edad</Text>
          <Text style={styles.valorEdad}>{edad} años</Text>
        </View>

        <View style={styles.linea} />

        <View style={styles.botonesContainer}>
          <Pressable style={styles.botonActualizar} onPress={irAActualizar}>
            <Text style={styles.textoBotonActualizar}>Actualizar</Text>
          </Pressable>

          <Pressable style={styles.botonEliminar} onPress={() => setModalVisible(true)}>
            <Text style={styles.textoBotonEliminar}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalMensaje}>
              ¿Estás seguro de que deseas eliminar al usuario{'\n'}
              <Text style={{ fontWeight: 'bold' }}>{nombre}</Text>?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.modalBotonCancelar}
                onPress={() => setModalVisible(false)}
                disabled={eliminando}
              >
                <Text style={styles.modalTextoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.modalBotonEliminar}
                onPress={confirmarEliminacion}
                disabled={eliminando}
              >
                {eliminando ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.modalTextoEliminar}>Sí, eliminar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  valorNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  valorEdad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  botonesContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  botonActualizar: {
    backgroundColor: '#EAB308',
    width: '60%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotonActualizar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    width: '60%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  textoBotonEliminar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    width: '85%',
    maxWidth: 380,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMensaje: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBotonCancelar: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  modalTextoCancelar: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  modalBotonEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  modalTextoEliminar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
