import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAppContext } from '../context/AppContext';

export default function AddContent() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // New state for the URL
  const { userID, username, userPicture } = useAppContext();
  console.log("this is userID " + userID)
  console.log("this is username " + username)
  console.log("this is userPicture "+ userPicture)
  // Pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Get a pre-signed URL from your backend
  const getPresignedUrl = async () => {
    try {
      const response = await fetch('https://juntosbackend.onrender.com/get-presigned-url');
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
      throw error;
    }
  };

  // Upload image to S3 using the pre-signed URL
  const uploadImageToS3 = async (presignedUrl, imageUri) => {
    try {
      // Get file extension (e.g., "jpg" or "png")
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const fileExtension = fileInfo.uri.split('.').pop().toLowerCase();
      const mimeType = `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`;
  
      // Read file as binary (Blob)
      const blob = await fetch(imageUri).then(res => res.blob());
  
      // Upload with correct Content-Type
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: blob,
        headers: { 'Content-Type': mimeType },
      });
  
      if (!response.ok) throw new Error('Upload failed');
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // Handle the full upload process
  const handlePost = async () => {
    if (!image) {
      Alert.alert("Please select an image first");
      return;
    }
  
    setIsUploading(true);
  
    try {
      // Step 1: Get pre-signed URL from backend
      const presignedUrl = await getPresignedUrl();
  
      // Step 2: Upload image to S3
      await uploadImageToS3(presignedUrl, image);
  
      // Step 3: Get the public URL (remove query parameters from presigned URL)
      const publicUrl = presignedUrl.split('?')[0];
      console.log("Uploaded Image URL:", publicUrl);
      setUploadedImageUrl(publicUrl);
  
      // Step 4: Create the post with the image URL and caption
      const response = await fetch('https://juntosbackend.onrender.com/api/post/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userID, // Replace with actual user ID
          username: username, // Replace with actual username
          thoughts: caption,
          picture: publicUrl,
          profile:userPicture
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
  
      const responseData = await response.json();
      console.log("Post created:", responseData);
  
      Alert.alert("Success", "Your post has been created successfully!");
      setImage(null);
      setCaption("");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.navbar}>
        <Text style={styles.logo}>Juntos</Text>
        <TouchableOpacity>
          <Image 
            source={require('../../assets/icon-profile.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.postCard}>
          <Text style={styles.postTitle}>Create a Post</Text>
          
          <TextInput
            style={styles.input}
            placeholder="What's in your mind?"
            placeholderTextColor="#aaa"
            multiline
            value={caption}
            onChangeText={setCaption}
          />

          <TouchableOpacity style={styles.customButton} onPress={pickImage}>
            <Text style={styles.customButtonText}>Upload an Image</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: image }} style={styles.imageSelected} />
          )}

          <TouchableOpacity 
            style={[styles.customButton, isUploading && { opacity: 0.7 }]} 
            onPress={handlePost}
            disabled={isUploading}
          >
            <Text style={styles.customButtonText}>
              {isUploading ? "Uploading..." : "Post"}
            </Text>
          </TouchableOpacity>

          {/* Display the uploaded URL */}
          {uploadedImageUrl && (
            <Text style={styles.urlText}>
              Uploaded to: {uploadedImageUrl}
            </Text>
          )}
        </View>
      </ScrollView>
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
    marginTop: 25,
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
    marginTop: 15,
    width: 350,
    height: 380,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  customButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderWidth: 1,
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
    width: "90%"
  },
  urlText: {
    marginTop: 10,
    color: '#4a90e2',
    fontSize: 14,
    textAlign: 'center',
  }
});