// imports 
import React, { useState, useCallback, useEffect } from 'react'; 
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import TaskList from './src/components/TaskList'; //component responsible for rendering list content
import * as Animatable from 'react-native-animatable'; //Animation Import

// Add the icons to the library
library.add(faPlus, faArrowLeft);

// Main component
export default function App() {
   // State variables to manage the task list
  const [task, setTask] = useState([]); // Array to store tasks

  const AnimatadeBtn = Animatable.createAnimatableComponent(TouchableOpacity); // Create animatable TouchableOpacity component
 
  const [open, setOpen] = useState(false); // Boolean for modal visibility (closed by default)
  const [loading, setIsLoading] = useState(false);  // Boolean for loading state (not loading by default)
  const [input, setInput] = useState(''); // String to store user input for new task

  // Loading tasks from AsyncStorage on component mount
  useEffect(() => {
    const loadTask = async () => {
      setIsLoading(true);  // Set loading state to true 
      const taskStorage = await AsyncStorage.getItem('@task'); // Get tasks from AsyncStorage
      if (taskStorage) {
        setTask(JSON.parse(taskStorage)); // Parse and update task state if tasks exist
      }
      setIsLoading(false); // Set loading state to false 
    };
       
    loadTask(); // Call the loadTask function

  }, []); // Empty dependency array ensures this effect runs only once on mount


  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    //save if has a new activity

    saveTasks();
  
  }, [task]); 

  // Function to handle adding a new task
  function handleAdd() {
    if (input === '') return; // Check if input is empty

    // Use input as the key and task
    const data = {
      key: input,
      task: input,
    };

    setTask([...task, data]); //takes all the existing tasks and adds the new data with 'key' and 'task'
    setOpen(false);  // Close the modal
    setInput('');// Clear the input field
  }

  // Function to handle deleting a task
  const handleDelete = useCallback((data) => {
    const find = task.filter((r) => r.key !== data.key);  // searches for the item, filters it, and returns the items that are different from the selected key
    setTask(find);  // updates the state with all the items except the clicked one
  });

  // ----- //

  return (

    <SafeAreaView style={styles.container}> 
      {/* Changing the top border of the application needs to be changed in app.json also with the addition of the androidStatusBar  */}
      <StatusBar backgroundColor='#190545' barStyle='light-content' /> 

      {/* main component visual element  */}
      <Image 
        style={styles.imgBg}
        source={require('./assets/element.png')}
      />
      
      {/* Main component title*/}
      <View>
        <Text style={styles.text}>To do List</Text>
      </View>

      {/* List structure */}
      <FlatList
        marginHorizontal={20}
        showsHorizontalScrollIndicator={false} 
        showsVerticalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />
       
       {/* modal  */}
      <Modal animationType='slide' transparent={false} visible={open}>
        <SafeAreaView style={[styles.container, styles.modal]}>
          <View style={styles.groupText}>
            
            {/* icon when pressed, exits the modal and returns to the main component  */}
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.backIcon}>
              
              <FontAwesomeIcon icon={faArrowLeft} size={30} color='white' />
            
            </TouchableOpacity>

            {/* modal title */}
            <Text style={[styles.text, styles.modalText]}>New Activity</Text>
          
          </View>
          
          {/* input for adding new activity */}
          <Animatable.View animation='fadeInUp' useNativeDriver>
              <TextInput
                style={styles.input}
                multiline={true}
                autoCorrect={false}
                placeholder='What is the new activity?'
                placeholderTextColor='#A49FCE'
                value={input}
                onChangeText={(textExercicy) => setInput(textExercicy)}
              />

             {/* Send new activitys button */}
              <TouchableOpacity style={styles.btn} onPress={handleAdd}>
                <Text style={styles.textBtn}>Send</Text>
              </TouchableOpacity>
          </Animatable.View>

           {/* modal visual elements */}
          <View>
            <Image
              style={styles.imgGirl}
              source={require('./assets/girlReading.png')}
            />
            <Animatable.Image
               useNativeDriver
               animation="pulse"
               duration={2000}
               iterationCount="infinite"
              style={styles.imgBgGirl}
              source={require('./assets/element.png')}
            />
          </View>
        
        
        </SafeAreaView>
      
      </Modal>
      
      {/* add more activities button */}
      <AnimatadeBtn
        style={styles.iconPlus}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} size={40} color='white' />
      
      </AnimatadeBtn>
    
    
    </SafeAreaView>

  );
}


// Styling


// main
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190545',
  },

  // text
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 50,
  },

  // add icon
  iconPlus: {
    position: 'absolute',
    bottom: 60,
    right: 40,
    backgroundColor: '#7066C6',
    width: '17%',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: .5,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
 
  // main element component 

  imgBg: {
    width: '160%',
    height: '35%',
    position: 'absolute',
    top: 0,
    left: -260,
  },


  // modal area

  // modal text
  modalText: {
    marginBottom: 10,
  },

  // modal icon

  backIcon: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#7066C6',
    width: '14%',
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: .5,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },

  // visual elements modal

  imgGirl: {
    position: 'absolute',
    bottom: -400,
    zIndex: 9,
  },

  imgBgGirl: {
    position: 'absolute',
    bottom: -530,
  },
 
  //modal input

  input: {
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    backgroundColor: '#16194c',
    padding: 9,
    height: 85,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E09FE2',
    textAlignVertical: 'top',
    color: '#fff',
  },

 // modal button  
  btn: {
    marginTop: 20,
    backgroundColor: '#7066C6',
    marginLeft: 70,
    marginRight: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  // modal text button
  textBtn: {
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
