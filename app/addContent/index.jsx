import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image,Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';



export default function AddContent() {

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
 
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.navbar}>
        <Text style={styles.logo}>Juntos</Text>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/icon-profile.png')} // Make sure this path is correct
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
       <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.imageSelected} />}
    </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This ensures the view takes up the entire screen
    backgroundColor: '#f9fafe', // Set background color for the entire screen
  },
  addContent: {
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  navbar: {
    width: '100%',
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
 },
imageSelected: {
  width: 350,
  height: 380,
  resizeMode: 'cover', // Optional: 'contain' or 'cover' depending on your layout need
  borderRadius: 10,    // Optional for rounded corners
},
});
