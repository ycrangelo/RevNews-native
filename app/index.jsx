import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  const handleLogin = () => {
    // Handle login logic here
    console.log('Login pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RevNews</Text>
      <Text style={styles.tag}>Where feedback empowers growth.</Text>
      {/* <Link href="/homepage"> click me daddy</Link> */}

      <TextInput
        style={[styles.input, {   marginTop: 100}]}
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
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.or}>─────Or─────</Text>
      <Link style={styles.Sign} href="/homepage">
        Sign Up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C4E80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 60,
    fontSize: 70,
    color: '#fff',
  },
  tag: {
    marginTop: 2,
    fontSize: 12,
    color: '#fff',
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#fff',
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  or: {
    marginTop: 30,
    fontSize: 17,
    color: '#fff',
  },
  Login: {
    fontSize: 20,
    marginTop: 100,
    color: '#fff',
  },
  Sign: {
    marginTop: 40,
    color: '#fff',
    textDecorationLine: 'underline', // Adds the underline
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#2C4E80',
    textAlign: 'center',
  },
});
