import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform, // Add this import
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/navbar/index';
import { useAppContext } from '../context/AppContext';
import { Link, useRouter } from 'expo-router';

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const router = useRouter();
  const { userID, username, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    // Reset all local state
    setSelectedTab('posts');
    setPosts([]);
    setLikedPosts([]);
    setSavedPosts([]);
    setModalVisible(false);
    setCurrentPostId(null);
    setCommentText('');
    setCommentsList([]);
    router.push('/');
  };

  useEffect(() => {
    if (selectedTab === 'saves') {
      fetchSavedPosts();
    } else {
      fetchUserPosts();
    }
  }, [selectedTab]);

  const fetchSavedPosts = async () => {
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/saves/getSavedPosts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userID }),
      });

      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch saved posts:', err);
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://juntosbackend.onrender.com/api/post/getUserPosts/${userID}`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user posts:', error);
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/post/likePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setPosts(prev =>
        prev.map(post => post._id === postId ? { ...post, likes: data.likes } : post)
      );
      setLikedPosts(prev => [...prev, postId]);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // const handleUnlike = async (postId) => {
  //   try {
  //     const res = await fetch('https://juntosbackend.onrender.com/api/post/unlikePost', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ postId }),
  //     });
  //     const data = await res.json();
  //     setPosts(prev =>
  //       prev.map(post => post._id === postId ? { ...post, likes: data.likes } : post)
  //     );
  //     setLikedPosts(prev => prev.filter(id => id !== postId));
  //   } catch (error) {
  //     console.error('Error unliking post:', error);
  //   }
  // };

  const fetchComments = async (postId) => {
    setLoadingComments(true);
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/comment/getComments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setCommentsList(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const sendComment = async () => {
    if (!commentText.trim()) return;
    try {
      await fetch('https://juntosbackend.onrender.com/api/comment/createComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: currentPostId,
          userId: userID,
          username: username,
          comment: commentText
        }),
      });
      setCommentText('');
      fetchComments(currentPostId);
    } catch (error) {
      console.error('Error sending comment:', error);
    }
  };

  const handleCommentPress = (postId) => {
    setCurrentPostId(postId);
    fetchComments(postId);
    setModalVisible(true);
  };

  const handleSavePost = async (postId) => {
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/saves/createSavedPosts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userID,
          postId: postId
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSavedPosts(prev => [...prev, postId]);
        // If in saves tab, refresh the list
        if (selectedTab === 'saves') {
          fetchSavedPosts();
        }
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  // const handleUnsavePost = async (postId) => {
  //   try {
  //     const res = await fetch('https://juntosbackend.onrender.com/api/saves/deleteSavedPost', {
  //       method: 'DELETE',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         userId: userID,
  //         postId: postId
  //       }),
  //     });
  //     if (res.ok) {
  //       setSavedPosts(prev => prev.filter(id => id !== postId));
  //       // If in saves tab, refresh the list
  //       if (selectedTab === 'saves') {
  //         fetchSavedPosts();
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error unsaving post:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.navbar}>
        <Text style={styles.logo}>{username || 'Profile'}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'posts' && styles.activeTab]}
          onPress={() => setSelectedTab('posts')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'posts' && styles.activeTabText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'saves' && styles.activeTab]}
          onPress={() => setSelectedTab('saves')}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === 'saves' && styles.activeTabText,
            ]}
          >
            Saves
          </Text>
        </TouchableOpacity>
      </View>

      {/* ScrollView Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : posts.length === 0 ? (
          <Text style={{ marginTop: 20 }}>No {selectedTab} to display</Text>
        ) : (
          posts.map((post) => (
            <View key={post._id} style={styles.wrapContent}>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Image
                    source={require('../../assets/icon-profile.png')}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={{ marginLeft: 10, fontWeight: '100' }}>
                    {post.userId || 'Anonymous'}
                  </Text>
                </View>
                <Text style={{ marginTop: 10 }}>{post.thoughts || 'No caption'}</Text>
                <View
                  style={{
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: post.picture }}
                    style={{
                      width: 350,
                      height: 380,
                      resizeMode: 'cover',
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
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
                    <TouchableOpacity onPress={() => handleCommentPress(post._id)}>
                      <FontAwesome5 name="comment-dots" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity 
                    onPress={() => 
                      savedPosts.includes(post._id)
                        ? handleUnsavePost(post._id)
                        : handleSavePost(post._id)
                    }
                  >
                    <MaterialIcons
                      name={savedPosts.includes(post._id) ? "bookmark" : "save-alt"}
                      size={26}
                      color={savedPosts.includes(post._id) ? "blue" : "black"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {loadingComments ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                commentsList.map((comment, index) => (
                  <View key={index} style={styles.comment}>
                    <Text style={styles.commentUser}>{comment.username || "User"}</Text>
                    <Text>{comment.comment}</Text>
                  </View>
                ))
              )}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Write a comment..."
                style={styles.input}
              />
              <TouchableOpacity onPress={sendComment} style={styles.sendButton}>
                <Text style={{ color: 'white' }}>Send</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

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
  navbar: {
    width: '100%',
    marginTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  logo: {
    marginTop: 20,
    marginLeft: 6,
    fontSize: 30,
    color: '#060d20',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    maxHeight: '80%',
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 20,
    marginRight: 10,
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});