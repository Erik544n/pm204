import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native'; 

import { Perfil } from './Perfil';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Perfil style={styles.tarjetaVerde} nombre="Erik" carrera="Sistemas" materia="Movil" cuatri="9" />

      <Perfil 
      style={styles.tarjetaRojo} 
      nombre="asdf" 
      carrera="asdgdf"
      materia="Movil" 
      cuatri="9" />

      <Perfil style={styles.tarjetaVerde} nombre="Erik 2" carrera="Sistemas" materia="Movil" cuatri="9" />



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'Space-evenly',
    flexDirection:'center',
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
  },
  tarjetaVerde:{
    backgroundColor:'green'
  },
  tarjetaRojo:{
    backgroundColor:'#FF6B6B'
  },
});