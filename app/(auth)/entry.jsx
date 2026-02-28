import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { hydrateAuth, requestOtp } from "@/store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OnboardingScreen() {
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  
  // Accessing phone from the nested user object in your new state
  const { user,theme,isOtpLoading:loading } = useSelector((state) => state.auth);
  const phone = user?.phone || "";

  const handlePhoneChange = (text) => {
    // Updating the user object in Redux to keep the phone number in sync
    dispatch(hydrateAuth({ 
      user: { ...user, phone: text } 
    }));
  };

  const handleSendCode = async () => {
    if (phone?.length === 10) {
      try {
        await dispatch(requestOtp(phone)).unwrap();
        router?.push("/(auth)/verify");
      } catch (error) {
        console.error("API Error:", error);
        alert(error || "Check your internet connection");
      }
    }
  };

  const handleSkip = async () => {
    try {
      router?.replace("/(tabs)");
    } catch (e) {
      console.error("Skip failed", e);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar?.setButtonStyleAsync("dark");
    }
  }, [theme]);

  return (
    <View className="flex-1 bg-white pb-24" style={{ paddingTop: inset.top }}>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
      
      {/* SKIP BUTTON */}
      <View className="flex-row justify-end px-6 pt-4">
        <Pressable onPress={handleSkip} className="bg-gray-100 px-4 py-2 rounded-full">
          <Text className="text-gray-600 font-bold text-xs uppercase tracking-widest">
            Skip
          </Text>
        </Pressable>
      </View>

      <View className="flex-1 px-8 justify-center pb-[100px]">
        <Text className="text-5xl font-black tracking-tighter">Fixr.</Text>
        <Text className="text-gray-500 text-lg mt-2">Professional services at your door.</Text>

        <View className="mt-12 flex-row items-center bg-gray-100 rounded-2xl px-4 py-5 border border-gray-200">
          <Text className="text-lg font-bold mr-2">+91</Text>
          <View className="w-[1px] h-6 bg-gray-300 mr-3" />
          <TextInput
            placeholder="00000 00000"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={handlePhoneChange}
            className="flex-1 text-lg font-bold"
          />
        </View>

        <Pressable 
          onPress={handleSendCode}
          className={`mt-6 py-4 rounded-2xl items-center shadow-lg ${phone?.length === 10 ? 'bg-blue-600 shadow-blue-500/30' : 'bg-gray-300'}`}
          disabled={phone?.length < 10}
        >
          <Text className="text-white font-bold text-lg">{loading ? "Sending..." : "Continue"}</Text>
        </Pressable>

        <Text className="text-center text-gray-400 text-xs mt-8">
          Enter your number to sync your bookings and profile.
        </Text>
      </View>
    </View>
  );
}