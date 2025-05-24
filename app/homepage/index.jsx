import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import Navbar from "../components/navbar/index";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const scrollRef = useRef(null);

  const fetchPosts = () => {
    fetch('https://backendsabay.onrender.com/api/post/getAllPost')
      .then(res => res.json())
      .then(data => {
        if (!isNearBottom) {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts(); // initial fetch
    const intervalId = setInterval(fetchPosts, 7000); // fetch every 7 seconds
    return () => clearInterval(intervalId);
  }, [isNearBottom]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 40;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setIsNearBottom(isBottom);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Navbar />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={400}
        ref={scrollRef}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          posts.map((post, index) => (
            <View key={index} style={styles.wrapContent}>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Image source={require('../../assets/icon-profile.png')} style={{ width: 50, height: 50 }} />
                  <Text style={{ textAlign: 'center', fontWeight: '100' }}>{post.userId || 'Anonymous'}</Text>
                </View>
                <View>
                  <Text style={{ marginTop: 10 }}>{post.thoughts || 'No caption provided.'}</Text>
                  <View style={{ alignItems: "center", overflow: 'hidden', borderRadius: 10 }}>
                    <Image
                      source={{ uri: post.picture }}
                      style={{ width: 350, height: 380, resizeMode: 'cover' }}
                    />
                  </View>
                  <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <TouchableOpacity onPress={() => console.log('Liked!')}>
                          <AntDesign name="hearto" size={24} color="black" />
                        </TouchableOpacity>
                        <Text>{post.likes || 0}</Text>
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
          ))
        )}
      </ScrollView>
      <View style={styles.addContent}>
        <Link href="/addContent" asChild>
          <TouchableOpacity>
            <MaterialIcons name="add-circle-outline" size={32} color="black" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
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
    borderRadius: 10,
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
