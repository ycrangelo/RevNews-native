import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router'
import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const { userID, username, userPicture } = useAppContext();
  // console.log("this is the userProfile") // This should log the URL
  // console.log(userPicture) // This should log the URL
  
  return (
    <View style={styles.navbar}>
      <Text style={styles.logo}>Juntos</Text>
      <Link href="/profile" asChild>
        <TouchableOpacity>
                <Image 
          source={userPicture ? { uri: userPicture } : require('../../../assets/icon-profile.png')}
          style={styles.image}
          onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
        />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
  },
  navbar: {
    width: '100%',
    marginTop: 30,
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
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25, // half of 50 to make it a circle
    marginRight: 10,
  }
});