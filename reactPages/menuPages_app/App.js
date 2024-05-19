import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import * as Font from 'expo-font'; //importa as fonts
import bgStart from './assets/bg-PrincipalPage.png'; //importa a imagem para background


// background
const image = bgStart;

// Componentes de páginas

//pagina principal
const PaginaInicial = () => {
  return (
<View style={styles.pagina}>

<ImageBackground source={image} style={styles.image}>
  
  <Text style={styles.textoPagina}>Personalized furniture for unique people</Text>
  
</ImageBackground>

</View>
  );
};

//pagina um
const Pagina1 = () => {
  return (
    <View style={styles.pagina}>
        
        <Text style={styles.textoPagina1}>Strato Chair</Text>
        <View style={styles.bgImage}>
          <Image
            style={styles.ImageFurniture}
            source={require('./assets/chair.png')}
          />
        </View>
        <View style={styles.bgText}>
          <Text style={styles.textMoney}>$ 95.90</Text>
          <Text style={styles.textMain}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut sapien a nisi laoreet cursus nec non lorem. In nec est est. Sed et   tempor sem.
          </Text>
        </View>

    </View>

  
  );
};

//pagina dois
const Pagina2 = () => {
  return (
 <View style={styles.pagina}>
      <Text style={styles.textoPagina2}>EcoPlus Sofa</Text>
      <View style={styles.bgImage2}>
      <Image
        style={styles.ImageFurniture2}
        source={require('./assets/sofa.png')}
      />
      </View>

      <View style={styles.bgText2}>
        <Text style={styles.textMoney2}>$ 180.45</Text>
        <Text style={styles.textMain2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut sapien a nisi laoreet cursus nec non lorem. In nec est est. Sed et tempor sem.
        </Text>
      </View>
      
    </View>
  );
};

// chamadas (?)

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Urbanist-Bold': require('./font/Urbanist-Bold.ttf'),
        'Urbanist-Medium': require('./font/Urbanist-Medium.ttf'),
        'Urbanist-Regular': require('./font/Urbanist-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);


  //Abrir e fechar Menu
  const [menuAberto, setMenuAberto] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState('Página Inicial');

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const navegarPara = (pagina) => {
    setPaginaAtual(pagina);
    setMenuAberto(false);
  };

  // Renderização condicional da página atual
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'Página Inicial':
        return <PaginaInicial />;
      case 'Página 1':
        return <Pagina1 />;
      case 'Página 2':
        return <Pagina2 />;
      default:
        return null;
    }
  };


  //elementos retornados (?)

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.titulo}>BrandNew</Text>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
          <Text style={styles.menuHamburguer}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {menuAberto && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página Inicial')}>
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página 1')}>
            <Text style={styles.menuItemText}>BrandNew Chairs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navegarPara('Página 2')}>
            <Text style={styles.menuItemText}>BrandNew Sofas</Text>
          </TouchableOpacity>
       
        </View>
      )}

      {/* Conteúdo */}
      <View style={styles.content}>{renderizarPagina()}</View>
    </View>
  );
};

// Estlizações


const styles = StyleSheet.create({

  // Geral
  container: {
    flex: 1,
    backgroundColor: '#E6E3D7',
    paddingTop: 24,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  menuHamburguer: {
     fontSize:25,   
  },


  titulo: {
    fontSize: 28,
    fontFamily: 'Urbanist-Bold',
  },
 
  menuIcon: {
    padding: 10,
  },
 
  menu: {
    backgroundColor: '#E6E3D7',
    padding: 10,
    position:'absolute',
    width:'100%',
    top:98.7,
    zIndex:99999,
  },
 
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  
  menuItemText: {
    fontSize: 16,
    fontFamily:'Urbanist-Medium',
  },
  
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  
  pagina: {
    position: 'relative', // Adicionando para servir como referência para o posicionamento absoluto
    width: '100%', // Garantindo que o contêiner tenha uma largura definida
    height: '100%', // Garantindo que o contêiner tenha uma altura definida
    justifyContent: 'center',
    alignItems: 'center',
    
  },

//  Estilo texto pagina principal
  textoPagina: {
    fontSize: 30,
    paddingLeft:35,
    paddingRight:35,
    textAlign: 'center',
    fontFamily:'Urbanist-Medium',
    color:'#2B3705',  
    position:'absolute',
    top:30, 
   
  },


  //  Estilo texto primeira pagina (Chair)
  textoPagina1: {
    fontSize: 27,
    fontFamily:'Urbanist-Bold',
    color:'#2B3705',  
    position:'absolute',
    top:50, 
    left:30,
  
  },

  image: {
    width: '100%', 
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
    position: 'absolute', 
    
  },

      // Backgrond da imagem chair
    bgImage:{
      position:'absolute',
      backgroundColor:'#B5B2A7',
      borderRadius: 68,
      height:'35%',
      top:180,
      width:'80%',
    },
    
    // Imagem da página chair
    ImageFurniture:{
      position:'absolute',
      top: -40,
      width:250,
      height:280,
      },
      
    

 // mensagens balão página chair backgrond
    bgText:{
      backgroundColor:'#B5B2A7',
      width:200,
      padding:20,
      paddingTop:5,
      borderBottomEndRadius:60,
      borderBottomStartRadius:60,
      borderTopEndRadius:60,
      position:'absolute',
      bottom:20,
      right:30,
    },

      
 // mensagens balão página chair conteúdo
  textMoney:{
    fontSize:30,
    fontWeight:'bold',
    color:'#2B3705',
    textAlign:'center',
   },
 
   textMain:{
     fontSize:16,
     fontWeight:'400',
     color:'#2B3705',
     textAlign:'center'
    },
  
  
   //  Estilo texto segunda pagina (Sofa)
  textoPagina2: {
    fontSize: 27,
    fontFamily:'Urbanist-Bold',
    color:'#2B3705',  
    position:'absolute',
    top:50, 
    right:30,
  
  },

  
  // Backgrond da imagem sofa
  bgImage2:{
    position:'absolute',
    backgroundColor:'#B5B2A7',
    borderRadius: 68,
    height:'30%',
    top:150,
    width:'80%',
    
  },
 
   // Imagem da página sofa
  ImageFurniture2:{
    position:'absolute',
    top: 146,
    right:-29,
    width:350,
    height:120,
    },


 // mensagens balão página sofa backgrond
  bgText2:{
    backgroundColor:'#B5B2A7',
    width:200,
    padding:25,
    textAlign:'center',
    fontSize:16,
    borderBottomEndRadius:60,
    borderBottomStartRadius:60,
    borderTopStartRadius:60,
    position:'absolute',
    bottom:20,
    left:30,
  },
 

// mensagens balão página Sofa
textMoney2:{
  fontSize:30,
  fontWeight:'bold',
  color:'#2B3705',
  textAlign:'center',
 },

 textMain2:{
   fontSize:16,
   fontWeight:'400',
   color:'#2B3705',
   textAlign:'center'
  },

});

export default App;