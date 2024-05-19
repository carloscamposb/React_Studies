import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text,Image, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
    <Image
        style={styles.tinyLogo}
        source={require('./assets/frog.png')}
      />
      <Text style={styles.title} >Little green Frog  </Text>
    <View  style={styles.allText}>
    
      
      <View style={styles.group}>
      <Text style={styles.subtitle}> 🐸 Where do they live?</Text>
      <Text>Frogs generally live in shaded areas and near water such as rivers, lakes, and swamps</Text>
      </View>
      
      <View style={styles.group}>
      <Text  style={styles.subtitle}>🐸 What do they eat?</Text>
      <Text>These cuties eat insects, some of which are pests to humans like mosquitoes, as well as spiders, worms, and other animals. </Text>
      </View>
    </View>
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

  tinyLogo: {
   width:320,
   height:250,
  },

  allText: {
   backgroundColor:'#cec9c4',
   width:'80%',
   padding:20,
   borderRadius:8,
   shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: .25,
    shadowRadius: 3.84,
    elevation: 8, // Esta propriedade é específica para Android

  },
  
  title:{
   fontSize:25,
   fontStyle:'italic',
   fontWeight:'600',

  },

  group:{
    display:'flex',
    padding:10,
   },

  subtitle:{
    fontSize:18,
    fontWeight:600,
    
  } 
});
