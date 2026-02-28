import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';

// Fonts
import { BarlowCondensed_400Regular, useFonts } from '@expo-google-fonts/barlow-condensed';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

// State & Logic
import { useLogout } from '@/hooks/useLogout';

SplashScreen.preventAutoHideAsync();

export default function AppContent() {
  const { logout } = useLogout();
  
  // Updated selectors to match minimal state
  const { isReady } = useSelector((state) => state.auth);

  const [fontsLoaded] = useFonts({
    'Barlow-Condensed': BarlowCondensed_400Regular,
    'Poppins': Poppins_400Regular,
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold
  });

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
        <Stack.Screen name="(settings)/settings/edit-profile" />
        <Stack.Screen name="health" />
      </Stack>

      {/* Dev Reset Button */}
      {__DEV__ && (
        <Pressable 
          onPress={() => logout(true)}
          className="absolute bottom-24 right-6 z-[999999] bg-red-600 w-12 h-12 rounded-full items-center justify-center shadow-2xl border-2 border-white"
        >
          <Text className="text-white text-[10px] font-black">RESET</Text>
        </Pressable>
      )}
    </>
  );
}