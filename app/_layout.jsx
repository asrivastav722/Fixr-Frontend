import { BarlowCondensed_400Regular, useFonts } from '@expo-google-fonts/barlow-condensed';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import "./global.css";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  
  const [fontsLoaded] = useFonts({
    'Barlow-Condensed': BarlowCondensed_400Regular,
    'Poppins': Poppins_400Regular,
  });

  const asyncHideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (fontsLoaded) {
      asyncHideSplashScreen();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <SafeAreaView className='flex-1'>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="profile" />
              </Stack>
          </SafeAreaView>
}

