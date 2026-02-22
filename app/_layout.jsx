import { BarlowCondensed_400Regular, useFonts } from '@expo-google-fonts/barlow-condensed';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import "./global.css";
import { Platform, View } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const inset= useSafeAreaInsets()
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

  return <Stack >
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="profile/[id]" options={{headerShown: Platform.OS === "ios",
          headerTransparent: true,
          headerBackTitle: "",
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: "#fff",}}/>
        <Stack.Screen name="role/[role]" options={{headerShown: Platform.OS === "ios",
          headerTransparent: true,
          headerBackTitle: "",
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: "#fff",}}/>
      </Stack>
}

