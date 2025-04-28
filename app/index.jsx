import { StyleSheet, TextInput, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default"/>
      <Text style={styles.logo}>Juntos</Text>
      <Text style={styles.tag}>Pag-Tropa, Laging Hataw! 🚀🍻</Text>

      <TextInput
        style={[styles.input, { marginTop: 100 }]}
        placeholder="Username"
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
      />

      {/* Turn button into a Link */}
      <Link href="/homepage" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>

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
    color:"#060d20",
    backgroundColor: '#f9fafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 60,
    fontSize: 100,
    color:"#060d20",
  },
  tag: {
    marginTop: 2,
    fontSize: 13,
  color:"#060d20",
  },
  input: {
    width: '90%',
    height: 40,
    color:"#060d20",
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  or: {
    marginTop: 30,
    fontSize: 17,
 color:"#060d20",
  },
  Login: {
    fontSize: 20,
    marginTop: 100,
color:"#060d20",
  },
  Sign: {
    marginTop: 40,
color:"#060d20",
    textDecorationLine: 'underline', // Adds the underline
  },
  button: {
    marginTop: 20,
    backgroundColor:"#3c90da",
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
