import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
 const context = useContext(AppContext);
 if (!context) {
  throw new Error('useAppContext must be used within an AppProvider');
 }
 return context;
};

// Provider component
export const AppProvider = ({ children }) => {
 const [userID, setUserID] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [username, setUsername] = useState('');
 const [userPicture, setUserPicture] = useState(null);

 useEffect(() => {
  loadSavedData();
 }, []);

 const loadSavedData = async () => {
  try {
   const savedUserData = await AsyncStorage.getItem('userData');
   const savedLoginState = await AsyncStorage.getItem('isLoggedIn');

   if (savedUserData && savedLoginState === 'true') {
    const parsedUserData = JSON.parse(savedUserData);
    console.log('Loading saved user data:', parsedUserData);
    setUserID(parsedUserData.userID || parsedUserData.id);
    setUsername(parsedUserData.username || '');
    setUserPicture(parsedUserData.profilePicture || null);
    setIsLoggedIn(true);
   }
  } catch (error) {
   console.error('Error loading saved data:', error);
  }
 };

 const updateUserData = async (data) => {
  try {
   if (data) {
    console.log('Updating user data:', data);
    setUserID(data.userID || data.id);
    setUsername(data.username || '');
    setUserPicture(data.profilePicture || null);
    setIsLoggedIn(true);

    const userDataToStore = {
     userID: data.userID || data.id,
     username: data.username,
     profilePicture: data.profilePicture
    };

    await AsyncStorage.setItem('userData', JSON.stringify(userDataToStore));
    await AsyncStorage.setItem('isLoggedIn', 'true');
   }
  } catch (error) {
   console.error('Error saving user data:', error);
  }
 };

 const logout = async () => {
  try {
   setUserID(null);
   setUsername('');
   setUserPicture(null);
   setIsLoggedIn(false);
   await AsyncStorage.removeItem('userData');
   await AsyncStorage.removeItem('isLoggedIn');
  } catch (error) {
   console.error('Error during logout:', error);
  }
 };

 const updateUserPicture = async (pictureUrl) => {
  try {
   setUserPicture(pictureUrl);
   if (userData) {
    const updatedUserData = { ...userData, profilePicture: pictureUrl };
    setUserData(updatedUserData);
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
   }
  } catch (error) {
   console.error('Error updating user picture:', error);
  }
 };

 const toggleTheme = () => {
  setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
 };

 const setLoading = (loading) => {
  setIsLoading(loading);
 };

 const value = {
  userID,
  isLoggedIn,
  username,
  userPicture,
  updateUserData,
  logout,
 };

 return (
  <AppContext.Provider value={value}>
   {children}
  </AppContext.Provider>
 );
};

// Add default export
export default AppProvider;
