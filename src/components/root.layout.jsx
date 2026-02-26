import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from "expo-navigation-bar";
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Fonts
import { BarlowCondensed_400Regular, useFonts } from '@expo-google-fonts/barlow-condensed';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

// State & Logic
import { useLogout } from '@/hooks/useLogout';
import { hydrateAuth } from '@/store/authSlice';

SplashScreen.preventAutoHideAsync();

export default function AppContent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();
  const { logout } = useLogout();
  
  const { isAuthenticated, hasLaunched, isReady } = useSelector((state) => state.auth);

  const [fontsLoaded] = useFonts({
    'Barlow-Condensed': BarlowCondensed_400Regular,
    'Poppins': Poppins_400Regular,
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold
  });

  // 1. "API Call" to AsyncStorage
  useEffect(() => {
    // Android specific UI fix
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync("dark");
    }
    
    const initialize = async () => {
      try {
        const keys = ["USER_SESSION", "HAS_LAUNCHED", "PHONE", "USERID", "APP_THEME"];
        const stores = await AsyncStorage.multiGet(keys);
        
        // Transform [['key', 'val'], ['key2', 'val2']] into { key: val }
        const data = Object.fromEntries(stores);

        dispatch(hydrateAuth({
          isAuthenticated: data.USER_SESSION === "active_user",
          hasLaunched: data.HAS_LAUNCHED === "true",
          phone: data.PHONE,
          userId: data.USERID,
          theme: data.APP_THEME || 'light'
        }));
      } catch (e) {
        console.error("Critical: Storage Hydration Failed", e);
      }
    };

    initialize();
  }, [dispatch]);

  // 2. Navigation Guard (Only runs once isReady and fontsLoaded are true)
  useEffect(() => {
    if (!isReady || !fontsLoaded) return;

    const rootSegment = segments[0];
    const inAuthGroup = rootSegment === "(tabs)" || rootSegment === "(settings)";
    const onEntryScreen = rootSegment === "(auth)" || rootSegment === "entry";

    // Scenario A: Logged in or returning user trying to see onboarding
    if ((isAuthenticated || hasLaunched) && onEntryScreen) {
      router?.replace("/(tabs)");
    } 
    // Scenario B: Fresh user trying to skip to the app
    else if (!hasLaunched && !isAuthenticated && inAuthGroup) {
      router?.replace("/(auth)/entry");
    }
  }, [isAuthenticated, hasLaunched, isReady, fontsLoaded]);

  // 3. Hide Splash Screen
  useEffect(() => {
    if (fontsLoaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady]);

  if (!fontsLoaded || !isReady) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/entry" />
        <Stack.Screen name="(auth)/verify" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(settings)/settings" />
      </Stack>

      {/* Dev Reset Button - Only visible in development */}
      {__DEV__ && (
        <Pressable 
          onPress={() => logout(true)}
          className="absolute bottom-20 right-6 z-[999999] bg-red-500/80 w-12 h-12 rounded-full items-center justify-center shadow-lg"
        >
          <Text className="text-white text-[10px] font-bold">RESET</Text>
        </Pressable>
      )}
    </>
  );
}