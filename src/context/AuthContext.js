import { hydrateAuth, refreshUser } from '@/store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const isPublicScreen = rootSegment === "(auth)" || rootSegment === "index"; // Add public screens here
    const isInsideTabs = rootSegment === "(tabs)";

    if (!isAuthenticated && !isPublicScreen) {
        router.replace("/(auth)/entry");
    } 
    // 2. If logged in and trying to access auth screens (Login/Register)
    else if (isAuthenticated && isPublicScreen) {
        router.replace("/(tabs)");
    }
    
  } ,[isAuthenticated, isReady, userloading]);

  return children;
};