import { useRouter } from "expo-router";
import {
  Clock,
  LogIn,
  MapPin,
  PlayCircle,
  Settings,
  ShieldCheck, Star,
  UserCircle2,
  Zap
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux"; // Hook into Redux

export default function MyProfilePage() {
  
  // 1. Get Auth Data from Redux instantly
  const { isAuthenticated,theme,phone } = useSelector((state) => state.auth);
  const router =useRouter()
  const [activeTab, setActiveTab] = useState("work"); 
  const [isTechMode, setIsTechMode] = useState(true);
  const iconColor = useMemo(() => (theme === 'dark' ? '#fff' : '#000'), [theme]);

  const navigateToSettings = () => {
    setTimeout(() => {
      router.push("/(settings)/settings");
    }, 0);
  };

  // 2. Guest Guard (Synchronous - No flickering)
  if (!isAuthenticated) {
    return (
      <View className="flex-1 bg-white dark:bg-black justify-center items-center px-8">
        <View className="bg-gray-100 dark:bg-gray-900 p-6 rounded-full mb-6">
          <UserCircle2 size={80} color={theme === 'dark' ? '#374151' : '#D1D5DB'} />
        </View>
        <Text className="text-2xl font-black dark:text-white text-center">
          Join the Community
        </Text>
        <Text className="text-gray-500 text-center mt-2 mb-10">
          Log in to book technicians, save your favorite profiles, and showcase your own skills.
        </Text>
        
        <Pressable 
          onPress={() => router?.push("/(auth)/entry")}
          className="bg-blue-600 w-full py-4 rounded-2xl flex-row justify-center items-center"
        >
          <LogIn color="white" size={20} />
          <Text className="text-white font-bold text-lg ml-2">Log In / Sign Up</Text>
        </Pressable>
      </View>
    );
  }

  // 3. Authenticated User View
  return (
    <View className="flex-1 gap-3 bg-gray-50 dark:bg-black">
      {/* --- CUSTOM TOP BAR --- */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-4 bg-white dark:bg-gray-950">
        <View>
          <Text className="text-gray-400 text-xs font-bold uppercase">Technician</Text>
          <Text className="text-xl font-black dark:text-white">Akash ({phone || "NA"})</Text>
        </View>

        {/* 2. Pure Tailwind Pressable */}
        <Pressable 
          onPress={navigateToSettings} 
          className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl items-center justify-center active:opacity-50"
        >
          <Settings size={22} color={theme === 'dark' ? '#fff' : '#000'} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mt-[-20px]">
        {/* --- PRO CARD --- */}
        <View className="bg-white dark:bg-gray-900 shadow-xl shadow-black/5 p-6">
          <View className="flex-row items-center">
            <View className="relative">
                <Image 
                    source={{ uri: "https://i.pravatar.cc/150?u=akash" }} 
                    className="w-20 h-20 rounded-[24px]" 
                />
                <View className="absolute -top-2 -right-2 bg-blue-900 p-1 rounded-lg border-2 border-white dark:border-gray-900">
                    <Zap size={14} color="white" fill="white" />
                </View>
            </View>
            <View className="ml-5 flex-1">
                <View className="flex-row items-center">
                    <Text className="text-lg font-bold dark:text-white mr-1">Akash Raj</Text>
                    <ShieldCheck size={16} color="#3B82F6" />
                </View>
                <Text className="text-gray-500 text-xs mb-2">Smart Home Specialist</Text>
                <View className="flex-row items-center bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md self-start">
                    <Star size={12} color="#EAB308" fill="#EAB308" />
                    <Text className="text-yellow-700 dark:text-yellow-500 text-[10px] font-bold ml-1">4.9 (124 Reviews)</Text>
                </View>
            </View>
          </View>

          <View className="flex-row justify-between mt-6 pt-6 border-t border-gray-50 dark:border-gray-800">
            <StatBlock label="Experience" value="5 Yrs" />
            <StatBlock label="Completion" value="98%" />
            <StatBlock label="Response" value="<1 Hr" />
          </View>
        </View>

        {/* --- MODE SWITCHER PANEL --- */}
        <View className="px-6 mt-6">
            <View className="bg-blue-600 rounded-[24px] p-5 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="bg-white/20 p-2 rounded-xl">
                        <Clock size={20} color="white" />
                    </View>
                    <View className="ml-3">
                        <Text className="text-white font-bold">Active for Hire</Text>
                        <Text className="text-blue-100 text-[10px]">Visible to local customers</Text>
                    </View>
                </View>
                <Switch 
                    value={isTechMode} 
                    onValueChange={setIsTechMode}
                    trackColor={{ false: "#1e3a8a", true: "#ffffff" }}
                    thumbColor={isTechMode ? "#3b82f6" : "#f4f3f4"}
                />
            </View>
        </View>

        <View className="flex-row px-6 mt-8 justify-between items-center">
            <Text className="text-lg font-bold dark:text-white">Service Showreel</Text>
            <View className="flex-row bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
                <TabButton title="Work" active={activeTab === 'work'} onPress={() => setActiveTab('work')} />
                <TabButton title="Reels" active={activeTab === 'reels'} onPress={() => setActiveTab('reels')} />
            </View>
        </View>

        <View className="flex-row flex-wrap px-4 mt-4">
            {[1,2,3,4,5,6].map((i) => (
                <View key={i} style={{ width: '50%', padding: 8 }}>
                    <View className="bg-gray-200 dark:bg-gray-800 rounded-[24px] overflow-hidden" style={{ height: i % 2 === 0 ? 220 : 180 }}>
                        <Image 
                            source={{ uri: `https://picsum.photos/id/${i+20}/400/600` }} 
                            className="w-full h-full"
                        />
                        <View className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded-lg">
                            {activeTab === 'reels' ? <PlayCircle size={14} color="white" /> : <MapPin size={14} color="white" />}
                        </View>
                    </View>
                </View>
            ))}
        </View>

        <View className="h-24" />
      </ScrollView>
    </View>
  );
}

// Sub-components
const StatBlock = React.memo(({ label, value }) => (
  <View className="items-center">
    <Text className="text-gray-400 text-[9px] uppercase font-bold tracking-widest mb-1">{label}</Text>
    <Text className="text-sm font-black dark:text-white">{value}</Text>
  </View>
));

const TabButton = React.memo(({ title, active, onPress, theme }) => {
  return (
    <Pressable 
      onPress={onPress}
      // Keep static classes in className, move dynamic colors to style
      className="px-4 py-2 rounded-lg"
      style={{
        backgroundColor: active 
          ? (theme === 'dark' ? '#374151' : '#FFFFFF') 
          : 'transparent',
        shadowOpacity: active ? 0.1 : 0,
      }}
    >
      <Text 
        className="text-xs font-bold"
        style={{
          color: active 
            ? (theme === 'dark' ? '#FFFFFF' : '#2563EB') 
            : '#6B7280'
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
});


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 16,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    // Native shadow instead of Tailwind classes
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
  },
  settingsButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  }
});