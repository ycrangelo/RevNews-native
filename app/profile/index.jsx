import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image,Button,TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router'
import { useState } from 'react';
import Navbar from "../components/navbar/index"


export default function Profile() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
     <Navbar/>

<ScrollView contentContainerStyle={styles.scrollContent}>
     <Text>
      profile
    </Text>
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
  marginTop:15,
  width: 350,
  height: 380,
  resizeMode: 'cover', // Optional: 'contain' or 'cover' depending on your layout need
  borderRadius: 10,    // Optional for rounded corners
  },
customButton: {
  backgroundColor: '#4a90e2',
  paddingVertical: 12,
  borderWidth:1,
  borderRadius: 8,
  marginTop: 20,
},
customButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
  },


postTitle: {
  fontSize: 18,
  fontWeight: '700',
  marginBottom: 12,
  color: '#333',
},

input: {
  borderColor: '#ddd',
  borderWidth: 1,
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#f5f5f5',
  textAlignVertical: 'top',
  height: 100,
  marginBottom: 16,
  },
  postCard: {
  width:"90%"
}

});
