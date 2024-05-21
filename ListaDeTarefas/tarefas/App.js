import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

// Add the icons to the library
library.add(faPlus, faArrowLeft);

export default function App() {
  const [task, setTask] = useState([]);

  const AnimatadeBtn = Animatable.createAnimatableComponent(TouchableOpacity);

  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      setIsLoading(true);
      const taskStorage = await AsyncStorage.getItem('@task');
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }
      setIsLoading(false);
    };

    loadTask();
  }, []);

  useEffect(() => {
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    //save if has a new activity
    saveTasks();
  }, [task]);

  function handleAdd() {
    if (input === '') return;

    const data = {
      key: input,
      task: input,
    };

    setTask([...task, data]); //takes all the existing tasks and adds the new data with 'key' and 'task'
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter((r) => r.key !== data.key);  // searches for the item, filters it, and returns the items that are different from the selected key
    setTask(find);  // updates the state with all the items except the clicked one
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#190545' barStyle='light-content' />

      <Image 
        style={styles.imgBg}
        source={require('./assets/element.png')}
      />

      <View>
        <Text style={styles.text}>To do List</Text>
      </View>

      <FlatList
        marginHorizontal={20}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={({ item }) => <TaskList data={item} handleDelete={handleDelete} />}
      />

      <Modal animationType='slide' transparent={false} visible={open}>
        <SafeAreaView style={[styles.container, styles.modal]}>
          <View style={styles.groupText}>
            <TouchableOpacity onPress={() => setOpen(false)} style={styles.backIcon}>
              <FontAwesomeIcon icon={faArrowLeft} size={30} color='white' />
            </TouchableOpacity>
            <Text style={[styles.text, styles.modalText]}>New Activity</Text>
          </View>
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


              <TouchableOpacity style={styles.btn} onPress={handleAdd}>
                <Text style={styles.textBtn}>Send</Text>
              </TouchableOpacity>
          </Animatable.View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190545',
  },

  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 50,
  },

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

  modalText: {
    marginBottom: 10,
  },

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

  imgBg: {
    width: '160%',
    height: '35%',
    position: 'absolute',
    top: 0,
    left: -260,
  },

  imgGirl: {
    position: 'absolute',
    bottom: -400,
    zIndex: 9,
  },

  imgBgGirl: {
    position: 'absolute',
    bottom: -530,
  },

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

  textBtn: {
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
