//perfil usando Desestructuracion

import { View, Text, Button, StyleSheet } from "react-native";
import {useState } from "react";



export const Perfil = ({ nombre, carrera, materia, cuatri,style }) => {
    const [mostrar, setMostrar] = useState(false);
    return (
        //Herencia de estilos
        <View style={[styles.tarjeta, style]}>
            <Text style={styles.nombre} >{nombre}</Text>

            {mostrar&& 
            <>
                <Text style={styles.carrera} >{carrera}</Text>
                <Text style={styles.otroTexto} >{materia}</Text>
                <Text style={styles.otroTexto} >{cuatri}</Text>
            </>
            }
            <Button title="Ver Perfil" onPress={() => setMostrar(!mostrar)} />
        </View>
    );

}

//Estilos
const styles = StyleSheet.create({
    nombre:{
        fontSize: 24,
        fontWeight: 600,
        textTransform: 'uppercase',

    },
    //Creación del contorno 
    tarjeta:{
        borderWidth: 2,
        padding: 15,
        margin: 10,
    },
    carrera:{
        fontSize:18,
        color:'red',
        fontFamily: 'Roboto',
    },

    otroTexto:{
        fontSize:12,
        fontFamily:'Roboto',
        fontStyle:'italic',
    },


    

});











//Perfil usando Props

/*  import { View, Text } from "react-native";

export const Perfil = (props) => {
    return (
        <View>
            <Text>{props.nombre}</Text>
            <Text>{props.carrera}</Text>
            <Text>{props.materia}</Text>
            <Text>{props.cuatri}</Text>
        </View>
    );

}
    */