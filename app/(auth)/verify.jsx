import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";import { useDispatch, useSelector } from "react-redux";
import * as NavigationBar from "expo-navigation-bar";
import { loginWithOtp } from "@/store/authSlice";

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-white px-8 pt-20">
          <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

          {/* HEADER */}
          <Text className="text-4xl font-black tracking-tighter text-zinc-950">
            Verify.
          </Text>
          
          <View className="flex-row items-center mt-3">
            <Text className="text-zinc-500 text-base">Sent to +91 {phone || "0000000000"}</Text>
            <Pressable onPress={() => router?.back()} className="ml-2">
              <Text className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                Change
              </Text>
            </Pressable>
          </View>

          {/* BOX OTP INPUT */}
          <Pressable 
            onPress={() => inputRef.current?.focus()} 
            className="flex-row justify-between gap-4 mt-12"
          >
            {[...Array(4)].map((_, i) => (
              <View 
                key={i} 
                className={`flex-1 h-20 border-2 rounded-2xl items-center justify-center
                  ${otp.length === i ? 'border-zinc-950 bg-white' : 'border-zinc-100 bg-zinc-50'}`}
                style={otp.length === i ? { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 } : {}}
              >
                <Text className="text-3xl text-zinc-900 font-bold">
                  {otp[i] || ""}
                </Text>
                {/* Visual Cursor for empty active box */}
                {otp.length === i && (
                  <View className="absolute bottom-4 w-6 h-1 bg-blue-600 rounded-full" />
                )}
              </View>
            ))}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={setOtp}
            maxLength={4}
            keyboardType="number-pad"
            autoFocus
            style={{ position: 'absolute', opacity: 0, height: 0 }}
          />

          {/* PRIMARY BUTTON - Standardized with Onboarding */}
          <Pressable 
            onPress={verifyOTP}
            disabled={otp.length < 4 || loading}
            className={`mt-10 py-5 rounded-2xl items-center shadow-lg shadow-zinc-400 ${
              otp.length < 4 ? 'bg-zinc-300' : 'bg-black'
            } active:scale-[0.98] transition-all`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-black text-xs uppercase tracking-[2px]">
                Verify & Continue
              </Text>
            )}
          </Pressable>

          {/* RESEND SECTION */}
          <View className="mt-8 flex-row justify-center">
            {timer > 0 ? (
              <View className="flex-row items-center bg-zinc-100 px-4 py-2 rounded-full">
                <Text className="text-zinc-500 text-xs font-medium">
                  Resend code in <Text className="text-zinc-900 font-bold">{timer}s</Text>
                </Text>
              </View>
            ) : (
              <Pressable 
                onPress={() => { setTimer(30); setOtp(""); }}
                className="active:opacity-60"
              >
                <Text className="text-blue-600 font-bold text-xs uppercase tracking-widest">
                  Resend Code
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}