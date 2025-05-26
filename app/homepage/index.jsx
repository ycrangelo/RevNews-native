import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, StatusBar,
  TouchableOpacity, Image, ActivityIndicator
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import Navbar from "../components/navbar/index";
import { useAppContext } from '../context/AppContext'; // <-- ✅ Import your context hook

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  const scrollRef = useRef(null);
  const { userID } = useAppContext(); // <-- ✅ Access userID from context

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
    fetchPosts();
    const intervalId = setInterval(fetchPosts, 7000);
    return () => clearInterval(intervalId);
  }, [isNearBottom]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 40;
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setIsNearBottom(isBottom);
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch('https://backendsabay.onrender.com/api/post/likePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, likes: data.likes } : post
        )
      );
      setLikedPosts(prev => [...prev, postId]);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const res = await fetch('https://backendsabay.onrender.com/api/post/unlikePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, likes: data.likes } : post
        )
      );
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleCommentPress = () => {
    console.log('Commented by userID:', userID); // ✅ Log the userID from context
  };

  return (
    <View style={styles.container}>
       <StatusBar barStyle="dark-content" />
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
                      <View style={{ flexDirection: "row", gap: 5, alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() =>
                            likedPosts.includes(post._id)
                              ? handleUnlike(post._id)
                              : handleLike(post._id)
                          }
                        >
                          <AntDesign
                            name={likedPosts.includes(post._id) ? "heart" : "hearto"}
                            size={24}
                            color={likedPosts.includes(post._id) ? "red" : "black"}
                          />
                        </TouchableOpacity>
                        <Text>{post.likes || 0}</Text>
                      </View>
                      <TouchableOpacity onPress={handleCommentPress}>
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


