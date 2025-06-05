import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppProvider, useAppContext } from './context/AppContext';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { updateUserData, isLoggedIn } = useAppContext();

  // Check if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/homepage');
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://juntosbackend.onrender.com/api/users/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful') {
        const userData = {
          userID: response.data.user._id,
          username: response.data.user.username,
          profilePicture: response.data.user.profilePicture
        };
        console.log('Login successful, user data:', userData);
        updateUserData(userData);
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
    marginTop: 25,
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

export default function App() {
  return (
    <AppProvider>
      <Login />
    </AppProvider>
  );
}
