// 👇 All necessary imports
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView, StatusBar,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Navbar from "../components/navbar/index";
import { useAppContext } from '../context/AppContext';

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const scrollRef = useRef(null);
  const { userID, username } = useAppContext();

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/post/getAllPost');
      const data = await res.json();
      if (!isNearBottom) {
        setPosts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch

    const intervalId = setInterval(() => {
      if (!isNearBottom) {
        fetchPosts(); // Fetch only if not near bottom
      }
    }, 7000);

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

  const handleUnlike = async (postId) => {
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/post/unlikePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      setPosts(prev =>
        prev.map(post => post._id === postId ? { ...post, likes: data.likes } : post)
      );
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

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
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleUnsavePost = async (postId) => {
    try {
      const res = await fetch('https://juntosbackend.onrender.com/api/saves/deleteSavedPost', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userID,
          postId: postId
        }),
      });
      if (res.ok) {
        setSavedPosts(prev => prev.filter(id => id !== postId));
      }
    } catch (error) {
      console.error('Error unsaving post:', error);
    }
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
                <Image 
                  source={{ uri: post.profile }} 
                  style={{ width: 50, height: 50, resizeMode: 'cover', borderRadius: 25 }} 
                />
                <Text style={{ marginLeft: 10,fontSize:15 }}>{post.username || 'Anonymous'}</Text>
              </View>
                <Text style={{ marginTop: 18,fontWeight:'bold',marginBottom: 5 }}>{post.thoughts || 'No caption provided.'}</Text>
                <View style={{ alignItems: "center", borderRadius: 10, overflow: 'hidden' }}>
                  <Image
                    source={{ uri: post.picture }}
                    style={{ width: 350, height: 380, resizeMode: 'cover',paddingTop: 10, }}
                  />
                </View>
                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', gap: 5 }}>
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
                  <TouchableOpacity onPress={() => handleSavePost(post._id)}>
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

      <View style={styles.addContent}>
        <Link href="/addContent" asChild>
          <TouchableOpacity>
            <MaterialIcons name="add-circle-outline" size={32} color="black" />
          </TouchableOpacity>
        </Link>
      </View>

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
});
