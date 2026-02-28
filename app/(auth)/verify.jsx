import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, TextInput, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as NavigationBar from "expo-navigation-bar";

import { useTheme } from "@/context/ThemeContext";
import { hydrateAuth, loginWithOtp } from "@/store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerifyOTP() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // 1. Get phone and loading state from Redux
  const { user, isVerifying:loading } = useSelector((state) => state.auth);
  const phone = user?.phone || "";
  
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
    if (otp.length !== 4) return;

    try {
      // 2. Real Backend Integration via Redux Thunk
      // We unwrap() to handle the navigation only on success
      await dispatch(loginWithOtp({ 
        phone: phone, 
        otp: otp, 
        fullName: "Verified User" // Placeholder name for registration
      })).unwrap();

      // 3. Navigation is handled here after successful login/persist
      router?.replace("/(tabs)");
    } catch (err) {
      // Error from backend (e.g., "Invalid OTP")
      Alert.alert(
        "Verification Failed", 
        err || "The OTP you entered is incorrect. Please use 0000.",
        [{ text: "Try Again", onPress: () => setOtp("") }]
      );
    }
  };
    
  // 4. Auto-verify when 4 digits are reached (updated from 6)
  useEffect(() => {
    if (otp.length === 4) {
      verifyOTP();
    }
  }, [otp]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar?.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <View className="flex-1 bg-white px-8 pt-20">
      <Text className="text-3xl font-black">Verify Phone</Text>
      
      <View className="flex-row items-center mt-2">
        <Text className="text-gray-500">+91 {phone || "0000000000"}</Text>
        <Pressable onPress={() => router?.back()} className="ml-2">
          <Text className="text-blue-600 font-bold text-xs uppercase">Change</Text>
        </Pressable>
      </View>

      {/* BOX OTP INPUT (Custom Stylized Boxes) */}
      <Pressable 
        onPress={() => inputRef.current?.focus()} 
        className="flex-row justify-between gap-3 mt-12"
      >
        {[...Array(4)].map((_, i) => (
          <View 
            key={i} 
            className={`flex-1 h-20 border-2 rounded-xl items-center justify-center bg-gray-50  
              ${otp.length === i ? 'border-blue-600' : 'border-gray-200'}`}
          >
            <Text className="text-3xl text-gray-800 font-semibold ">
              {otp[i] || ""}
            </Text>
          </View>
        ))}
      </Pressable>

      <TextInput
        ref={inputRef}
        value={otp}
        onChangeText={setOtp}
        maxLength={4} // Updated to 4
        keyboardType="number-pad"
        autoFocus
        style={{ position: 'absolute', opacity: 0, height: 0 }}
      />

      <Pressable 
        onPress={verifyOTP}
        className={`mt-10 py-4 rounded-2xl items-center ${otp.length === 4 ? 'bg-blue-600' : 'bg-gray-300'}`}
        disabled={otp.length < 4 || loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Verify & Continue</Text>
        )}
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