import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="detalles"
        options={{
          title: 'Detalle del usuario',
          headerBackTitle: '(tabs)',
        }}
      />
      <Stack.Screen
        name="actualizar"
        options={{
          title: 'Actualizar Usuario',
          headerBackTitle: 'Detalle del usuario',
        }}
      />
    </Stack>
  );
}