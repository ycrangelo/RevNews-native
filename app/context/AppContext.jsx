import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => {
 const context = useContext(AppContext);
 if (!context) {
  throw new Error('useAppContext must be used within an AppProvider');
 }
 return context;
};

// Create the provider component
export const AppProvider = ({ children }) => {
 // Add your shared state here
 const [userData, setUserData] = useState(null);
 const [theme, setTheme] = useState('light');
 const [isLoading, setIsLoading] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [username, setUsername] = useState('');
 const [userPicture, setUserPicture] = useState(null);

 // Load saved data when app starts
 useEffect(() => {
  loadSavedData();
 }, []);

 const loadSavedData = async () => {
  try {
   const savedUserData = await AsyncStorage.getItem('userData');
   const savedLoginState = await AsyncStorage.getItem('isLoggedIn');

   if (savedUserData && savedLoginState === 'true') {
    const parsedUserData = JSON.parse(savedUserData);
    setUserData(parsedUserData);
    setUsername(parsedUserData.username || '');
    setUserPicture(parsedUserData.profilePicture || null);
    setIsLoggedIn(true);
   }
  } catch (error) {
   console.error('Error loading saved data:', error);
  }
 };

 // Add your shared methods here
 const updateUserData = async (data) => {
  try {
   setUserData(data);
   if (data) {
    setUsername(data.username || '');
    setUserPicture(data.profilePicture || null);
    setIsLoggedIn(true);
    // Save to AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    await AsyncStorage.setItem('isLoggedIn', 'true');
   }
  } catch (error) {
   console.error('Error saving user data:', error);
  }
 };

 const logout = async () => {
  try {
   setUserData(null);
   setUsername('');
   setUserPicture(null);
   setIsLoggedIn(false);
   // Clear AsyncStorage
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

 // The value that will be shared across your app
 const value = {
  userData,
  theme,
  isLoading,
  isLoggedIn,
  username,
  userPicture,
  updateUserData,
  updateUserPicture,
  logout,
  toggleTheme,
  setLoading,
 };

 return (
  <AppContext.Provider value={value}>
   {children}
  </AppContext.Provider>
 );
}; 