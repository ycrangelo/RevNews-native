import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // For reading file data

export default function AddContent() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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
      // Read the file as binary data (not base64)
      const fileData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Binary
      });

      // Convert to blob-like format
      const blob = new Blob([fileData], { type: 'image/jpeg' });

      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': 'image/jpeg', // Match what your backend expects
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
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

      Alert.alert("Success", "Your post has been uploaded!");
      setImage(null);
      setCaption("");
    } catch (error) {
      Alert.alert("Error", "Failed to upload post. Please try again.");
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
        </View>
      </ScrollView>
    </View>
  );
}

// Keep your existing styles...

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
    marginTop:25,
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
