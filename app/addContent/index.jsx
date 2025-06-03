import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { encode } from 'base-64';

export default function AddContent() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

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

  const uploadImage = async () => {
    if (!image) return;
  
    setUploading(true);
    
    try {
      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileType = image.split('.').pop();
      const mimeType = `image/${fileType === 'jpg' ? 'jpeg' : fileType}`;
  
      const formData = new FormData();
      // React Native requires a slightly different format for file uploads
      formData.append('file', {
        uri: image,
        name: `upload.${fileType}`,
        type: mimeType
      });
  
      const response = await fetch('https://backendsabay.onrender.com/api/uploadthing', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
  
      // Handle response
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Upload failed');
      }
  
      const result = await response.json();
      console.log('Upload success:', result);
      return result.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handlePost = async () => {
    if (image) {
      await uploadImage();
    }
    // Here you would also handle the caption and other post data
    // and send it to your backend along with the image URL
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

          <View>
            <TouchableOpacity 
              style={styles.customButton} 
              onPress={pickImage}
              disabled={uploading}
            >
              <Text style={styles.customButtonText}>
                {uploading ? 'Uploading...' : 'Upload an Image'}
              </Text>
            </TouchableOpacity>
          </View>

          {image && (
            <Image source={{ uri: image }} style={styles.imageSelected} />
          )}

          <TouchableOpacity 
            style={[styles.customButton, uploading && styles.disabledButton]} 
            onPress={handlePost}
            disabled={uploading}
          >
            <Text style={styles.customButtonText}>
              {uploading ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
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
