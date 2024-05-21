import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Animatable from 'react-native-animatable';


library.add(faTrash);


export default function TaskList({data, handleDelete}){
    return(
      
         <Animatable.View 
         style={styles.container}
         animation="bounceIn"
         useNativeDriver
         
         >
          
            <View style={styles.activity}>
                   <Text style={styles.textActvity}> {data.task} </Text>
                <TouchableOpacity  onPress={() => handleDelete(data)} >
                 <FontAwesomeIcon icon={faTrash} size={20} color='white'  /> 
                </TouchableOpacity>
            </View>
         </Animatable.View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
    },

    activity:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:40,
        backgroundColor:'#16194c',
        paddingTop:20,
        paddingBottom:30,
        paddingLeft:10,
        paddingRight:10,
        elevation:1.5,
        borderRadius:8,
        borderWidth: 2, 
        borderColor: '#E09FE2', 
        shadowColor:'#000',
        shadowOpacity:.2,
        shadowOffset:{
            width:1,
            height:3,
        }

    },

    textActvity:{
          color: '#fff',
          fontSize:17,
          fontWeight:'400',
    },

 
});