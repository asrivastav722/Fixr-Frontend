import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@/context/ThemeContext";
import { login } from "@/store/authSlice";

export default function OTPScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { activeScheme } = useTheme();
  
  // 1. Get phone from Redux (set in entry.js)
  const { phone } = useSelector((state) => state.auth);
  
  // 2. Local state for the OTP typing (don't put typing-state in Redux)
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const inputRef = useRef(null);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const verifyOTP = async () => {
    // Mimicking backend check
    if (otp === "000000") {
      try {
        // 3. Save to "Database" (AsyncStorage)
        await Promise.all([
          AsyncStorage.setItem("USER_SESSION", "active_user"),
          AsyncStorage.setItem("HAS_LAUNCHED", "true"),
          AsyncStorage.setItem("PHONE", phone || ""),
          AsyncStorage.setItem("APP_THEME", activeScheme)
        ]);

        // 4. Update "Live State" (Redux)
        dispatch(login({ 
          phone: phone,
          userId: "user_" + Math.floor(Math.random() * 1000) 
        }));

        // 5. Navigate
        router?.replace("/(tabs)");
      } catch (e) {
        console.error("Verification Storage Error", e);
      }
    } else {
      Alert.alert(
        "Invalid Code", 
        "The OTP you entered is incorrect. Please use 000000.",
        [{ text: "Try Again", onPress: () => setOtp("") }]
      );
    }
  };
    
  // Auto-verify when 6 digits are reached
  useEffect(() => {
    if (otp.length === 6) {
      verifyOTP();
    }
  }, [otp]);

  // UI Bar Styling
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar?.setButtonStyleAsync(activeScheme === "dark" ? "light" : "dark");
    }
  }, [activeScheme]);

  return (
    <View className="flex-1 bg-white dark:bg-black px-8 pt-20">
      <Text className="text-3xl font-black dark:text-white">Verify Phone</Text>
      
      <View className="flex-row items-center mt-2">
        <Text className="text-gray-500">+91 {phone || "0000000000"}</Text>
        <Pressable onPress={() => router?.back()} className="ml-2">
          <Text className="text-blue-600 font-bold text-xs uppercase">Change</Text>
        </Pressable>
      </View>

      {/* BOX OTP INPUT */}
      <Pressable 
        onPress={() => inputRef.current?.focus()} 
        className="flex-row justify-between mt-12"
      >
        {[...Array(6)].map((_, i) => (
          <View 
            key={i} 
            className={`w-12 h-16 border-2 rounded-2xl items-center justify-center bg-gray-50 dark:bg-gray-900 
              ${otp.length === i ? 'border-blue-600' : 'border-gray-200 dark:border-gray-800'}`}
          >
            <Text className="text-2xl font-black dark:text-white">
              {otp[i] || ""}
            </Text>
          </View>
        ))}
      </Pressable>

      <TextInput
        ref={inputRef}
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
        keyboardType="number-pad"
        autoFocus
        style={{ position: 'absolute', opacity: 0, height: 0 }}
      />

      <Pressable 
        onPress={verifyOTP}
        className={`mt-10 py-4 rounded-2xl items-center ${otp.length === 6 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-800'}`}
        disabled={otp.length < 6}
      >
        <Text className="text-white font-bold text-lg">Verify & Continue</Text>
      </Pressable>

      <View className="mt-8 flex-row justify-center">
        {timer > 0 ? (
          <Text className="text-gray-400">Resend code in {timer}s</Text>
        ) : (
          <Pressable onPress={() => { setTimer(30); setOtp(""); }}>
            <Text className="text-blue-600 font-bold underline">Resend Code</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}