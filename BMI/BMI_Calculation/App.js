import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  
  const [weightFocused, setWeightFocused] = useState(false);
  const [heightFocused, setHeightFocused] = useState(false);

  const weightInputRef = useRef(null);
  const heightInputRef = useRef(null);

  

  function calculation() {
    const heightCalculation = height / 100;
    const bmi = weight / (heightCalculation * heightCalculation);

    if (bmi < 18.6) {
      alert('You are underweight. ' + '\nBMI: ' + bmi.toFixed(2))
    } else if (bmi >= 18.6 && bmi < 24.9) {
      alert('You are at a healthy weight. ' + '\nBMI: ' + bmi.toFixed(2))
    } else if (bmi >= 24.9 && bmi < 34.9) {
      alert('You are slightly overweight. ' + '\nBMI: ' + bmi.toFixed(2))
    } else if (isNaN(bmi)) {
      alert('Please, write a valid number.')
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.groupinput}>
        <TextInput
          ref={weightInputRef}
          style={[styles.input, weightFocused && styles.inputFocused]}
          value={weight}
          onChangeText={(weight) => setWeight(weight)}
          placeholder='Write down your weight in kg' 
          placeholderTextColor='#635C5C'
          keyboardType='numeric'
          onFocus={() => setWeightFocused(true)}
          onBlur={() => setWeightFocused(false)}
        />

        <TextInput
          ref={heightInputRef}
          style={[styles.input, heightFocused && styles.inputFocused]}
          value={height}
          onChangeText={(height) => setHeight(height)}
          placeholder='Write down your height in cm' 
          placeholderTextColor='#635C5C'
          keyboardType='numeric'
          onFocus={() => setHeightFocused(true)}
          onBlur={() => setHeightFocused(false)}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={calculation}
        >
          <Text style={styles.textBtn}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image style={styles.img} source={require('./assets/doctor.png')} />
      </View>

      <View style={styles.groupTitle}>
        <Text style={styles.titleDecoration}>BMI </Text>
        <Text style={styles.title}>Calculation</Text>
      </View>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  groupinput: {
    width: '100%',
    alignItems: 'center',
    top: 100,
  },


  input: {
    backgroundColor: '#ffcdcf',
    borderRadius: 10,
    width: '80%',
    padding: 10,
    color: '#7a3d3f',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  inputFocused: {
    backgroundColor: '#FF8D93',
  },


  btn: {
    position: 'relative',
    backgroundColor: '#1190A1',
    alignItems: 'center',
    borderRadius: 10,
    width: '60%',
    padding: 16,
    color: '#7a3d3f',
    marginBottom: 50,
  },
  textBtn: {
    fontSize: 17,
    color: 'white',
    fontWeight: '600',
  },
  img: {
    position: 'absolute',
    bottom: -550,
    left: 160,
    width: 200,
    zIndex: 99999,
  },
  groupTitle: {
    marginTop: 130,
    padding: 10,
  },
  titleDecoration: {
    fontSize: 120,
    fontWeight: 'bold',
    color: '#1190A1',
  },
  title: {
    position: 'absolute',
    fontSize: 50,
    bottom: -20,
    right: 80,
    fontWeight: '600',
  }
});
