import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, BarlowCondensed_400Regular } from '@expo-google-fonts/barlow-condensed';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';
import Homepage from '../src/pages/page.homepage';
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function App() {
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

  return (
    <div className="h-100vh w-100vw overflow-y-scroll">
      <Homepage />
    </div>
  );
}