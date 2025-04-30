import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import Navbar from "../components/navbar/index";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState('posts');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
    <View style={styles.navbar}>
        <Text style={styles.logo}>Naoi Rei</Text>
          </View>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'posts' && styles.activeTab]}
          onPress={() => setSelectedTab('posts')}
        >
          <Text style={[styles.tabText, selectedTab === 'posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'saves' && styles.activeTab]}
          onPress={() => setSelectedTab('saves')}
        >
          <Text style={[styles.tabText, selectedTab === 'saves' && styles.activeTabText]}>Saves</Text>
        </TouchableOpacity>
      </View>

      {/* ScrollView Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {selectedTab === 'posts' ? (
          <PostOrSaveItem />
        ) : (
          <PostOrSaveItem />
        )}
      </ScrollView>
    </View>
  );
}

// just add another function for post or save
// dinamicaly render it
const PostOrSaveItem = () => (
  <View>
    
            <View style={styles.wrapContent}>
          <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Image source={require('../../assets/icon-profile.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ textAlign: 'center', fontWeight:'100' }}>Naoi Rei</Text>
       </View>
          <View>
            <Text style={{ marginTop: 10 }}>Mabagal ang Kotse ko</Text>
            <View style={{ alignItems: "center", overflow: 'hidden', borderRadius: 10 }}>
              <Image 
                source={require('../../assets/picContent.jpg')} 
                style={{ width: 350, height: 380,resizeMode: 'cover' }}
              />
              </View>
              <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                  <TouchableOpacity onPress={() => console.log('Liked!')}>
                  <AntDesign name="hearto" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>13</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Commented!')}>
                  <FontAwesome5 name="comment-dots" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => console.log('Saved!')}>
                <MaterialIcons name="save-alt" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </View>
         </View>
    </View>
    
            <View style={styles.wrapContent}>
          <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Image source={require('../../assets/icon-profile.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ textAlign: 'center', fontWeight:'100' }}>Naoi Rei</Text>
       </View>
          <View>
            <Text style={{ marginTop: 10 }}>Mabagal ang Kotse ko</Text>
            <View style={{ alignItems: "center", overflow: 'hidden', borderRadius: 10 }}>
              <Image 
                source={require('../../assets/picContent.jpg')} 
                style={{ width: 350, height: 380,resizeMode: 'cover' }}
              />
              </View>
              <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                  <TouchableOpacity onPress={() => console.log('Liked!')}>
                  <AntDesign name="hearto" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>13</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Commented!')}>
                  <FontAwesome5 name="comment-dots" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => console.log('Saved!')}>
                <MaterialIcons name="save-alt" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </View>
         </View>
    </View>
    
            <View style={styles.wrapContent}>
          <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Image source={require('../../assets/icon-profile.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ textAlign: 'center', fontWeight:'100' }}>Naoi Rei</Text>
       </View>
          <View>
            <Text style={{ marginTop: 10 }}>Mabagal ang Kotse ko</Text>
            <View style={{ alignItems: "center", overflow: 'hidden', borderRadius: 10 }}>
              <Image 
                source={require('../../assets/picContent.jpg')} 
                style={{ width: 350, height: 380,resizeMode: 'cover' }}
              />
              </View>
              <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                  <View style={{ flexDirection: "row", gap: 5 }}>
                  <TouchableOpacity onPress={() => console.log('Liked!')}>
                  <AntDesign name="hearto" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>13</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Commented!')}>
                  <FontAwesome5 name="comment-dots" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => console.log('Saved!')}>
                <MaterialIcons name="save-alt" size={26} color="black" />
              </TouchableOpacity>
            </View>
          </View>
         </View>
        </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#4a90e2',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 3,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: '#4a90e2',
  },
  tabText: {
    fontSize: 18,
    color: '#4a90e2',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#f5c518',
  },
  image: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  content: {
  padding: 10,
   backgroundColor: '#f9fafe',
   borderWidth: 1,
   borderRadius:10
 },
 contentHeader: {
    justifyContent: 'flex-start',
  flexDirection: 'row',
   alignItems: 'center',
  },
  wrapContent: {
  width: '95%',
   backgroundColor: '#f9fafe',
   marginHorizontal: 10,
   marginTop: 10,
  },
    navbar: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
   padding: 5,
  },
  logo: {
    marginTop: 20,
    marginLeft:6,
    fontSize: 30,
    color: "#060d20",
  },
});
