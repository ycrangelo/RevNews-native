import { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://backendsabay.onrender.com/api/users/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        router.push('/homepage');
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      Alert.alert('Login Failed', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Text style={styles.logo}>Juntos</Text>
      <Text style={styles.tag}>Pag-Tropa, Laging Hataw! 🚀🍻</Text>

      <TextInput
        style={[styles.input, { marginTop: 100 }]}
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

      <TouchableOpacity style={[styles.button, isLoading && { opacity: 0.7 }]} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#f9fafe" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.or}>─────Or─────</Text>

      <Link style={styles.Sign} href="/signup">
        Sign Up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#060d20",
    backgroundColor: '#f9fafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 60,
    fontSize: 100,
    color: "#060d20",
  },
  tag: {
    marginTop: 2,
    fontSize: 13,
    color: "#060d20",
  },
  input: {
    width: '90%',
    height: 40,
    color: "#060d20",
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  or: {
    marginTop: 30,
    fontSize: 17,
    color: "#060d20",
  },
  Login: {
    fontSize: 20,
    marginTop: 100,
    color: "#060d20",
  },
  Sign: {
    marginTop: 40,
    color: "#060d20",
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 20,
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
