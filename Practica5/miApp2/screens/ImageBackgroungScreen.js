import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native'; 

export default function ImageBackgroundScreen() {

  const{Imagenindex, setImagenindex} = useState(0);
  const {blur, setBlur} = useState(0);

  const imagenes = [
    requiere('../assets/wave.png'),
    require('../assets/icon.png'),
    require('../assets/favicon.png'),
  ]
  

  return (
    
    
      <ImageBackground source={imagenes[Imagenindex]} 
      style={styles.container}
      imageneStyle= {styles.imagen} 
      blurRadius={blur}/>

      <View style={styles.tarjeta}> 
      
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
});


