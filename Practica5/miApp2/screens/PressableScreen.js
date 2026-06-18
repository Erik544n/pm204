import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Práctica Pressable</Text>
      <Text style={styles.contador}>Presiones: {contador}</Text>

      <Pressable
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado,
          contador >= 5 && styles.botonDesactivado
        ]}
        onPress={() => setContador(contador + 1)}
        onPressIn={() => console.log('Empezaste a presionar')}
        onPressOut={() => console.log('Soltaste el botón')}
        onLongPress={() => alert('Presión larga detectada')}
        delayLongPress={1000}
        disabled={contador >= 5}
        hitSlop={10}
        android_ripple={{ color: '#93c5fd' }}
      >
        <Text style={styles.textoBoton}>
          {contador >= 5 ? 'Botón desactivado' : 'Aumentar contador'}
        </Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contador: {
    fontSize: 20,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  botonPresionado: {
    backgroundColor: '#1e40af',
    transform: [{ scale: 0.96 }],
  },
  botonDesactivado: {
    backgroundColor: '#9ca3af',
  },
  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});