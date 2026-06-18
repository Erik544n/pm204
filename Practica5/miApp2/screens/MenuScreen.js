import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native'; 
import  React, {useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ModalScreen from './ModalScreen';

export default function MenuScreen() {

    const  [screen, setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>
        case 'safeArea':
            return <SafeAreaScreen/>
        case 'pressable':
            return <PressableScreen/>
        case 'textInput':
            return <TextInputScreen/>
        case 'flatList':
            return <FlatListScreen/>
        case 'imageBackground':
            return <ImageBackgroungScreen/>
        case 'activityIndicator':  
            return <ActivityIndicatorScreen/>
        case 'modal':
            return <ModalScreen/>

        case 'menu':
            default:
                return (
                    <View style={styles.container}>
                        <Button title ='Practica Tarjetas' onPress={() => setScreen('tarjetas')}/>
                        <Button title ='Practica SafeArea' onPress={() => setScreen('safeArea')}/>
                        <Button title ='Practica Pressable' onPress={() => setScreen('pressable')}/>
                        <Button title ='Practica TextInput' onPress={() => setScreen('textInput')}/>
                        <Button title ='Practica FlatList' onPress={() => setScreen('flatList')}/>
                        <Button title ='Practica ImageBackground' onPress={() => setScreen('imageBackground')}/>
                        <Button title ='Practica ActivityIndicator' onPress={() => setScreen('activityIndicator')}/>
                        <Button title ='Practica Modal' onPress={() => setScreen('modal')}/>
                    </View>
                );

    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

});