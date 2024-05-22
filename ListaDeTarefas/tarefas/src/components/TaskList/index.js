// imports 
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Animatable from 'react-native-animatable';

// Add the icons to the library
library.add(faTrash);



// TaskList component receives information from the data constant and the handledelete function
export default function TaskList({data, handleDelete}){
    return(
            //animation when the page is opened 
         <Animatable.View 
         style={styles.container}
         animation="bounceIn"
         useNativeDriver
         
         >
               {/* specifications of the input format that is in the main component */}
            <View style={styles.activity}>

                  {/* receives the data filled in the modal*/}
                
                <Text style={styles.textActvity}> {data.task} </Text>
                 
                   {/* when the trash icon is pressed, it triggers handleDelete to filter the list  */}
                
                <TouchableOpacity  onPress={() => handleDelete(data)} > 
                
                 <FontAwesomeIcon icon={faTrash} size={20} color='white'  /> 
                
                </TouchableOpacity>
            
            </View>
         </Animatable.View>
    )
}

// estyle
const styles = StyleSheet.create({

    // main
    container:{
        flex:1,
    },


    // style of main component inputs
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

    //text inside the main component input
    textActvity:{
          color: '#fff',
          fontSize:17,
          fontWeight:'400',
    },

 
});