import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSegments } from 'expo-router';
import { refreshUser, hydrateAuth } from '@/store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();
  
  // 1. Added missing selectors from Redux state
  const { isReady, isAuthenticated, userloading } = useSelector((state) => state.auth);

  // 2. Initialize Auth from Backend
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("USER_TOKEN");
        
        if (token) {
          // We wait for the backend to validate the token
          await dispatch(refreshUser()).unwrap();
        } else {
          // No token? Just hydrate the app as ready but unauthenticated
          dispatch(hydrateAuth({ isReady: true, isAuthenticated: false }));
        }
      } catch (error) {
        console.log("Auth Initialization Error:", error);
        // Ensure app becomes ready even if API fails
        dispatch(hydrateAuth({ isReady: true, isAuthenticated: false }));
      }
    };
    
    initAuth();
  }, []);

  // 3. Navigation Guard Logic
  useEffect(() => {
    // Wait until the backend check (refreshUser) is complete
    if (!isReady || userloading) return; 

    const rootSegment = segments[0];
    const inAuthGroup = rootSegment === "(auth)";
    const inTabsGroup = rootSegment === "(tabs)";

    if (!isAuthenticated && inTabsGroup) {
      // If flag is false (token expired or missing), send to login
      router.replace("/(auth)/entry");
    } 
    else if (isAuthenticated && inAuthGroup) {
      // If flag is true (backend validated), send to home
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isReady, userloading]);

  return children;
};