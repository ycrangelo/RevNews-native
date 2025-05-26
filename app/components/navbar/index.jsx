import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router'

export default function Navbar() {
  return (

      <View style={styles.navbar}>
    <Text style={styles.logo}>Juntos</Text>
      <Link href="/profile" asChild>
        <TouchableOpacity>
          <Image 
            source={require('../../../assets/icon-profile.png')} // Make sure this path is correct
            style={styles.image}
          />
     </TouchableOpacity>
     </Link>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the view takes up the entire screen
    backgroundColor: '#f9fafe', // Set background color for the entire screen
  },
  navbar: {
    width: '100%',
    marginTop:25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
   padding: 5,
  },
  logo: {
    fontSize: 30,
    color: "#060d20",
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});
