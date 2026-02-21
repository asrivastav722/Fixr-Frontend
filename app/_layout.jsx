import { BarlowCondensed_400Regular, useFonts } from '@expo-google-fonts/barlow-condensed';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
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
    NavigationBar?.setButtonStyleAsync("dark"); 
    if (fontsLoaded) {
      asyncHideSplashScreen();
    }
  }, [fontsLoaded]);



  if (!fontsLoaded) return null;

  return <View className="flex-1 bg-blue-950">
      {/* translucent={true} allows content to flow behind status bar on Android */}
      
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false,title:"" }} />
        <Stack.Screen 
          name="profile/[id]"
          options={{
            headerShown: true,
            title: "",
            headerTransparent: true,
            headerShadowVisible: false,
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </View>
}

