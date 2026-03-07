import { GuestView } from "@/components/card.guest";
import { useTheme } from "@/context/ThemeContext";
import { Stack, useRouter } from "expo-router";
import {
  ChevronRight,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Settings,
  ShieldCheck
} from "lucide-react-native";
import React from "react";
import { Image, Linking, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { useSelector } from "react-redux";



export default function MyProfilePage() {
  const { user, isAuthenticated, isReady } = useSelector((state) => state.auth);
  const { theme } = useTheme()
  const router = useRouter();
  const isDark = theme === 'dark';

  // Shared Theme Colors
  const colors = {
    bg: isDark ? "#09090b" : "#ffffff",
    card: isDark ? "#18181b" : "#fafafa",
    border: isDark ? "#27272a" : "#f4f4f5",
    textMain: isDark ? "#fafafa" : "#09090b",
    textSub: isDark ? "#a1a1aa" : "#71717a",
    accent: "#2563eb",
  };

  if (!isReady) return null

  if (!isAuthenticated) return <GuestView/>;

  return (
    <View className="flex-1 ">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <Stack.Screen 
        options={{
          headerShown: true,
          header: () => (
            <View 
              className="flex-row items-center justify-between p-4 bg-white dark:bg-zinc-950 border-b  border-zinc-200 dark:border-zinc-800"
            >
              <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 capitalize">
                {user?.roles?.[0] || "Account"}
              </Text>
              
              <Pressable 
                onPress={() => router.push("/(settings)/settings")}
                className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 active:scale-95 transition-all"
              >
                <Settings size={20} color={colors.textMain} />
              </Pressable>
            </View>    
          ),
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-zinc-100 dark:bg-zinc-900 p-3">
        {/* 1. IDENTITY SECTION */}
        <View className="items-center py-8 px-5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-2xl">
          <View className="relative">
            <Image 
              source={{ uri: user?.profileImage }} 
              className="w-28 h-28 rounded-3xl bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 shadow-xl"
            />
            <View className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5 border-4 border-white dark:border-zinc-900">
              <ShieldCheck size={16} color="white" />
            </View>
          </View>

          <View className="items-center mt-5">
            <Text className="text-2xl font-poppins font-bold text-zinc-900 dark:text-zinc-50">
              {user?.fullName}
            </Text>
            
            <View className="flex-row items-center mt-2 gap-2">
              {user?.roles?.map((role, index) => (
                <View key={index} className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <Text className="text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    {role}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 2. CONTACT & LOCATION SECTION */}
        <ContactCard user={user} colors={colors} />

        {/* 3. FOOTER TRUST */}
        <View className="items-center pb-12 pt-4">
          <Text className="text-zinc-400 dark:text-zinc-600 text-[10px] font-roboto font-bold uppercase tracking-[2px]">
            Fixr Verified Professional
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


const ContactCard = ({ user, colors }) => {
  const { email, phone, location } = user || {};
  const { address, city, coordinates } = location || {};

  return (
    <View>      
      <Text className=" font-bold text-zinc-900 dark:text-zinc-50 text-sm py-3 border border-transparent">
        Contact Info
      </Text>

      <View className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
        {email && (
          <ContactRow 
            icon={<Mail size={18} color={colors.accent} />} 
            label="Email Address" 
            value={email}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          />
        )}
        
        <ContactRow 
          icon={<Phone size={18} color={colors.accent} />} 
          label="Phone Number" 
          value={phone || "+91 00000 00000"} 
          onPress={() => Linking.openURL(`tel:${phone}`)}
        />

        {/* LOCATION ROW */}
        <Pressable 
          className="flex-row items-center p-3 rounded-2xl active:bg-zinc-100 dark:active:bg-zinc-800"
          onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${coordinates?.[1]},${coordinates?.[0]}`)}
        >
          <View className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-900 items-center justify-center shadow-sm">
            <MapPin size={20} color={colors.accent} />
          </View>
          
          <View className="ml-4 flex-1">
            <Text className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">Saved Address</Text>
            <Text className="text-sm font-roboto-bold text-zinc-900 dark:text-zinc-100 mt-0.5 leading-5">
              {address ? `${address}, ` : ""}{city || "City Not Set"}
            </Text>
            
            {coordinates && (
              <View className="flex-row items-center mt-2">
                <View className="bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                  <Text className="text-[9px] font-mono font-bold text-emerald-600">
                    {coordinates?.[1]?.toFixed(4)}° N, {coordinates?.[0]?.toFixed(4)}° E
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <Navigation size={16} color={colors.textSub} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const ContactRow = ({ icon, label, value, onPress }) => (
  <Pressable 
    onPress={onPress}
    className="flex-row items-center p-3 rounded-2xl active:bg-zinc-100 dark:active:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800"
  >
    <View className="w-12 h-12 rounded-2xl bg-zinc-200 dark:bg-zinc-900 items-center justify-center">
      {icon}
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest">{label}</Text>
      <Text className="text-sm font-roboto-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{value}</Text>
    </View>
    <ChevronRight size={16} color="#d1d5db" />
  </Pressable>
);