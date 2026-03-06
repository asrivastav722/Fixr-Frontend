import * as NavigationBar from "expo-navigation-bar";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, 
  Text, 
  TextInput, 
  Pressable, 
  StatusBar, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { hydrateAuth, requestOtp } from "@/store/authSlice";

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
      NavigationBar?.setButtonStyleAsync("dark"); 
  }, [inset]);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
        <StatusBar barStyle="dark-content" backgroundColor="white"  />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 bg-white" style={{ paddingTop: inset.top }}>
            
            {/* SKIP BUTTON */}
            <View className="flex-row justify-end px-6 pt-2">
              <Pressable 
                onPress={handleSkip} 
                className="bg-zinc-100 px-5 py-2.5 rounded-full active:bg-zinc-200"
              >
                <Text className="text-[10px]  text-blue-600 uppercase tracking-[1.5px]">
                  Skip
                </Text>
              </Pressable>
            </View>

            <View className="flex-1 px-8 justify-center pb-12">
              {/* BRANDING */}
              <Text className="text-5xl font-bold text-zinc-950 tracking-tighter">
                Fixr.
              </Text>
              <Text className="text-zinc-500 mt-3  text-lg leading-6">
                Professional services at{"\n"}your door.
              </Text>

              {/* PHONE INPUT */}
              <View className="mt-12 flex-row items-center bg-zinc-50 rounded-2xl px-5 py-4 border border-zinc-200 mb-8">
                <Text className="text-zinc-900 mr-2">+91</Text>
                <View className="w-[1px] h-6 bg-zinc-300 mr-4" />
                <TextInput
                  placeholder="00000 00000"
                  placeholderTextColor="#a1a1aa"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={handlePhoneChange}
                  className="flex-1 text-zinc-900 p-0 "
                />
              </View>

              {/* PRIMARY BUTTON */}
              <Pressable 
                onPress={handleSendCode}
                disabled={phone?.length < 10 || loading}
                className={`py-5 rounded-2xl items-center shadow-lg shadow-zinc-400 ${
                  phone?.length < 10 ? 'bg-zinc-300' : 'bg-black'
                } active:scale-[0.98]`}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-black text-xs uppercase tracking-[2px]">
                    Continue
                  </Text>
                )}
              </Pressable>

              <Text className="text-center text-zinc-400  text-xs mt-8 px-6 leading-5">
                Enter your number to sync your bookings and profile.
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}