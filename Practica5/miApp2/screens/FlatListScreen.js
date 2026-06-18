import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native'; 

export default function FlatListScreen() {
  return (
    <View style={styles.container}>
    
        <> Aqui va la practica de FlatList </>

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

});

