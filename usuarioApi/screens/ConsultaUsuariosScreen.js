import { SafeAreaView, View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { API_URL, TUNNEL_HEADERS } from '../config';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [refrescando, setRefrescando] = useState(false);
  const router = useRouter();

  const obtenerUsuarios = async (mostrarCargando = true) => {
    if (mostrarCargando) setCargando(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de timeout

    try {
      const respuesta = await fetch(API_URL, {
        signal: controller.signal,
        headers: TUNNEL_HEADERS,
      });
      clearTimeout(timeoutId);
      const datos = await respuesta.json();
      console.log("Respuesta API: ", datos);
      
      if (datos && datos.usuarios) {
        setUsuarios(datos.usuarios);
      } else {
        setUsuarios([]);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      console.log("Error API", error);
      if (error.name === 'AbortError') {
        console.warn("La consulta de usuarios excedió el tiempo límite.");
      }
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  // Se ejecuta automáticamente cada vez que la pantalla entra en foco
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios(true);
    }, [])
  );

  const handleRefresh = () => {
    setRefrescando(true);
    obtenerUsuarios(false);
  };

  const verDetalles = (usuario) => {
    router.push({
      pathname: '/detalles',
      params: {
        id: usuario.id,
        nombre: usuario.nombre,
        edad: usuario.edad,
      },
    });
  };

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <View style={styles.linea} />
      <View style={styles.cardFooter}>
        <Text style={styles.info}>Edad: {item.edad} años</Text>
        <Pressable onPress={() => verDetalles(item)}>
          <Text style={styles.botonDetalles}>Ver detalles →</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      {cargando && usuarios.length === 0 ? (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.textoCargando}>Cargando usuarios...</Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderTarjeta}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshing={refrescando}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.centroVacio}>
              <Text style={styles.textoVacio}>No hay usuarios registrados</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
  },
  botonDetalles: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCargando: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  centroVacio: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVacio: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});