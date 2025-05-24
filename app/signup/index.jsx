import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

export default function Login() {
  const [selected, setSelected] = useState('Male');
  const [fullname, setFullname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const payload = {
      username,
      fullname,
      gender: selected,
      contactNumber,
      password,
    };
  
    setLoading(true);
  
    try {
      const response = await fetch('https://backendsabay.onrender.com/api/users/singup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const contentType = response.headers.get('content-type');
  
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', ' created successfully!, Continue logging the account');
          router.push('/');
          console.log('User created:', data);
        } else {
          Alert.alert('Signup Failed', data.error || 'Something went wrong');
          console.error('Signup failed:', data.error);
        }
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        Alert.alert('Server Error', 'Received unexpected response from server.');
      }
  
    } catch (error) {
      Alert.alert('Error', 'Network or server issue');
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
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
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact #"
        placeholderTextColor="#ccc"
        value={contactNumber}
        onChangeText={setContactNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#f9fafe" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 30,
    fontSize: 50,
    marginBottom: 30,
    color: "#060d20",
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
    alignItems: 'center',
  },
  radioGroupContainer: {
    width: '90%',
    marginTop: 20,
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  gender: {
    color: "#060d20",
    alignSelf: 'flex-start',
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
