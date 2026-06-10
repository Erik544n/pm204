import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native'; 

import { Perfil } from './Perfil';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Image 
        source={require('./assets/wave.png')} 
        style={styles.logo} 
      />

      <Text style={styles.helloText}>Hello World</Text>
      <Text>--------------------</Text>
      
      <Perfil nombre="Erik" carrera="Sistemas" materia="Movil" cuatri="9" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,         
    height: 60,        
    marginBottom: 10,  
    resizeMode: 'contain',
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'normal',
  }
});