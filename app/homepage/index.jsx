import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';

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
            <Image source={require('../../assets/icon-profile.png')} style={{ width: 50, height: 50 }} />
            <Text style={{ textAlign: 'center' }}>Yocor, Angelo</Text>
          </View>
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
  navbar: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
   padding: 10,
    borderBottomWidth:1
  },
  logo: {
    fontSize: 30,
    color: "#060d20",
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  content: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 10,
   backgroundColor: '#f9fafe',
   borderWidth: 1,
   borderRadius:10
  },
  wrapContent: {
   backgroundColor: '#f9fafe',
   marginHorizontal: 10,
   marginTop: 10,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
