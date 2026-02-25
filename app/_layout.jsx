import { BarlowCondensed_400Regular, useFonts } from '@expo-google-fonts/barlow-condensed';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider } from '../src/context/ThemeContext';
import "./global.css";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Barlow-Condensed': BarlowCondensed_400Regular,
    'Poppins': Poppins_400Regular,
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold
  });

  const asyncHideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    NavigationBar?.setButtonStyleAsync("dark");
    if (fontsLoaded) {
      asyncHideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return  <ThemeProvider>
          <Stack >
              <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
              <Stack.Screen name="profile/[id]" options={{ headerShown: false}}/>
              <Stack.Screen name="role/[role]" options={{ headerShown: false}}/>
          </Stack>
      </ThemeProvider>
}

