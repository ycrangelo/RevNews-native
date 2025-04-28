import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  const [selected, setSelected] = useState('Male'); // Changed initial state to match one of the options

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  const RadioButton = ({ label, value, selected, onPress }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]} />
      <Text style={{ color: "#060d20" }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
   <View style={styles.container}>
    <Text style={styles.logo}>Sign Up</Text>
          <View style={styles.radioGroupContainer}>
        <Text style={styles.gender}>Gender</Text>
        <View style={styles.radioButtonsContainer}>
          {['Male', 'Female'].map(option => (
            <RadioButton
              key={option}
              label={option}
              value={option}
              selected={selected === option}
              onPress={setSelected}
            />
          ))}
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#ccc"
    />
          <TextInput
        style={styles.input}
        placeholder="Contact #"
        placeholderTextColor="#ccc"
      />
    
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
   logo: {
    marginTop: 30,
  fontSize: 50,
    marginBottom:30,
color:"#060d20",
  },
  container: {
    flex: 1,
    color: "#060d20",
    backgroundColor: '#f9fafe',
    alignItems: 'center',

  },
  radioGroupContainer: {
    width: '90%',
    marginTop: 20,
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start', // This aligns the radio buttons to the left
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  gender: {
    color: "#060d20",
    alignSelf: 'flex-start', // Aligns the gender text to the left
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#333',
  },
  input: {
    width: '90%',
    height: 40,
    color: "#060d20",
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor: '#555',
    backgroundColor: '#f9fafe',
  },
  button: {
    marginTop: 150,
    backgroundColor: "#3c90da",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#f9fafe',
    textAlign: 'center',
  },
});