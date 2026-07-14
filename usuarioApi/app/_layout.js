import {Stack} from 'expo-router'; // Navegación en pila.

export default function RootLayout() {
    return  <Stack screenOptions={{headerShown: false}} />; //navegación base pero no tiene el control de la aplicación. 

}