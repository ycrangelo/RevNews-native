import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Login() {
  const [selected, setSelected] = useState('Male');
  const [fullname, setFullname] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

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

  const getPresignedUrl = async () => {
    try {
      const response = await fetch('https://juntosbackend.onrender.com/get-presigned-url');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
      throw error;
    }
  };

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

  const handleLogin = async () => {
    if (!fullname || !contactNumber || !username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    let profileImageUrl = '';
    
    if (image) {
      setUploadingImage(true);
      try {
        // Get pre-signed URL from backend
        const { url, fileName } = await getPresignedUrl();

        // Upload image to S3
        await uploadImageToS3(url, image);

        // Construct the public URL
        profileImageUrl = `https://ycrangelojuntos.s3.ap-southeast-2.amazonaws.com/${fileName}`;
      } catch (error) {
        Alert.alert("Error", "Failed to upload profile image. Please try again.");
        setUploadingImage(false);
        return;
      } finally {
        setUploadingImage(false);
      }
    }

    const payload = {
      username,
      fullname,
      gender: selected,
      contactNumber,
      password,
      profile: profileImageUrl || undefined,
    };
  
    setLoading(true);
  
    try {
      const response = await fetch('https://juntosbackend.onrender.com/api/users/singup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const contentType = response.headers.get('content-type');
  
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Account created successfully! Please login.');
          setImage("")
          router.push('/');
        } else {
          Alert.alert('Signup Failed', data.error || 'Something went wrong');
        }
      } else {
        const text = await response.text();
        Alert.alert('Server Error', 'Received unexpected response from server.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network or server issue');
    } finally {
      setLoading(false);
    }
  };

  const RadioButton = ({ label, value, selected, onPress }) => (
    <TouchableOpacity style={styles.radioContainer} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, selected && styles.radioSelected]} />
      <Text style={{ color: "#060d20" }}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUploadContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.uploadText}>Tap to add profile photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.radioGroupContainer}>
        <Text style={styles.gender}>Gender</Text>
        <View style={styles.radioButtonsContainer}>
          {['Male', 'Female'].map(option => (
            <RadioButton
              key={option}
              label={option}
              value={option}
              selected={selected === option}
              onPress={setSelected}
            />
          ))}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#ccc"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact #"
        placeholderTextColor="#ccc"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#ccc"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin} 
        disabled={loading || uploadingImage}
      >
        {(loading || uploadingImage) ? (
          <ActivityIndicator color="#f9fafe" />
        ) : (
          <Text style={styles.buttonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 30,
    fontSize: 50,
    marginBottom: 30,
    color: "#060d20",
  },
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
    alignItems: 'center',
  },
  radioGroupContainer: {
    width: '90%',
    marginTop: 20,
  },
  radioButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  gender: {
    color: "#060d20",
    alignSelf: 'flex-start',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: '#333',
  },
  input: {
    width: '90%',
    height: 40,
    color: "#060d20",
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#f9fafe',
  },
  button: {
    marginTop: 50,
    backgroundColor: "#3c90da",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#f9fafe',
    textAlign: 'center',
  },
  imageUploadContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3c90da',
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e1e5eb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3c90da',
  },
  uploadText: {
    color: '#060d20',
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
  },
});