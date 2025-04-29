import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router'

export default function Homepage() {
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
        <View style={styles.wrapContent}>
          <View style={styles.content}>
          <View style={styles.contentHeader}>
             <Image source={require('../../assets/icon-profile.png')} style={{ width: 50, height: 50 }} />
             <Text style={{ textAlign: 'center', fontWeight:'100' }}>Yocor, Angelo</Text>
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
             <Text style={{ textAlign: 'center', fontWeight:'100' }}>Yocor, Angelo</Text>
       </View>
          <View>
            <Text style={{ marginTop: 10 }}>Mabagal ang Kotse ko</Text>
            <View style={{ alignItems: "center", overflow: 'hidden', borderRadius: 10 }}>
              <Image 
                source={require('../../assets/picContent.jpg')} 
                style={{ width: 350, height: 380,resizeMode: 'cover', }}
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
             <Text style={{ textAlign: 'center', fontWeight:'100' }}>Yocor, Angelo</Text>
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
             <Text style={{ textAlign: 'center', fontWeight:'100' }}>Yocor, Angelo</Text>
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
             <Text style={{ textAlign: 'center', fontWeight:'100' }}>Yocor, Angelo</Text>
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
      </ScrollView>
      <View style={styles.addContent}>
        <Link href="/addContent" asChild>
        <TouchableOpacity onPress={() => console.log('add Content!')}>
         <MaterialIcons name="add-circle-outline" size={32} color="black" />
          </TouchableOpacity>
          </Link>
      </View>
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
