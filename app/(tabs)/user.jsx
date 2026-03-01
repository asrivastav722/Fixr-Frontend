import { GuestView } from "@/components/card.guest";
import { useTheme } from "@/context/ThemeContext";
import { useRouter,Stack } from "expo-router";
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
  const { user,  isAuthenticated,isReady } = useSelector((state) => state.auth);
  const {theme}=useTheme()
  const router = useRouter();
  const isDark = theme === 'dark';
  if (!isReady) return null

  if (!isAuthenticated) return <GuestView/>;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Stack.Screen 
            options={{
              headerShown: true,
              header: () => (<View className="flex-row items-center justify-between p-3 bg-white dark:bg-black border-b border-gray-100">
                          <View className="flex-row items-center gap-3 flex-1">
                            <Text className="text-gray-800 dark:text-gray-100 font-semibold text-xl capitalize flex-1">{user?.roles?.[0]}</Text>
                          </View>
                          <Pressable 
                            onPress={() => router.push("/(settings)/settings")}
                            className="p-2 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                          >
                            <Settings size={24} color={isDark ? '#fff' : '#000'} />
                          </Pressable>
                        </View>    
              ),
            }} 
          />


      

      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        <View className="flex-col gap-4 py-4">
          <View className="flex-row items-center align-center p-4 border-b border-gray-100">
            <Image 
              source={{ uri: user?.profileImage }} 
              className="w-20 h-20 rounded-2xl bg-gray-200 dark:bg-gray-800"
            />
            <View className="ml-4 flex-1 gap-2">

              <View className="gap-3 items-center flex-row">
                <Text className=" dark:text-gray-400 font-semibold text-xl ">{user?.fullName}</Text>
                <ShieldCheck size={18} color="#3B82F6" />
              </View>

              <View className="flex-row items-center ">
                {user?.roles?.map((role,index)=>{
                  return <View key={index} className="bg-blue-600/10 px-2 py-1 rounded-full border border-blue-600/20">
                      <Text className="text-blue-600 text-xs capitalize ">{role}</Text>
                    </View>
                })}
              </View>

              <View className="flex-row items-center ">
                <MapPin size={12} color="#71717a" />
                <Text className="text-gray-500 text-[10px] ml-1 font-bold uppercase tracking-tighter">
                  {user?.location?.coordinates?.[0] } {user?.location?.coordinates?.[1]}
                </Text>
              </View>

            </View>
          </View>
          <ContactCard user={user}/>
        </View>
      </ScrollView>
    </View>
  );
}


const ContactCard= ( {user} )=>{
  // Destructuring for cleaner code
  const { email, phone, location } = user || {};
  const { address, city, coordinates } = location || {};

  return (
    <View className="p-3">      
      <Text className="font-semibold"> Contact </Text>

      {email && <ContactRow 
        icon={<Mail size={18} color="#71717a" />} 
        label="Email" 
        value={email || "not.linked@fixr.com"}
        onPress={() => Linking.openURL(`mailto:${email}`)}
      />}
      <ContactRow 
        icon={<Phone size={18} color="#71717a" />} 
        label="Phone" 
        value={phone || "+91 00000 00000"} 
        onPress={() => Linking.openURL(`tel:${phone}`)}
      />

      {/* LOCATION ROW */}
      <View className="flex-row items-center py-2 border-b border-gray-50 dark:border-gray-900/50 active:bg-gray-50 dark:active:bg-gray-900">
         <View className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 items-center justify-center">
          <MapPin size={18} color="#3B82F6" />
          </View>
        
        
        <View className="ml-4 flex-1">
          <Text className="text-xs text-gray-400 capitalize tracking-widest">Saved Address</Text>
          <Text className="text-sm font-bold dark:text-white mt-0.5 leading-5">
            {address ? `${address}, ` : ""}{city || "City Not Set"}
          </Text>
          
          {/* COORDINATES CHIP */}
          {coordinates && (
            <View className="flex-row items-center mt-2">
              <View className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <Text className="text-[9px] font-mono font-bold text-emerald-600">
                  {coordinates?.[1]?.toFixed(4)}° N, {coordinates?.[0]?.toFixed(4)}° E
                </Text>
              </View>
            </View>
          )}
        </View>

        <Pressable 
          className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
          onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${coordinates?.[1]},${coordinates?.[0]}`)}
        >
          <Navigation size={16} color="#71717a" />
        </Pressable>
      </View>

    </View>
  );
}

// Reusable Internal Component
const ContactRow = ({ icon, label, value, onPress }) => (
  <Pressable 
    onPress={onPress}
    className="flex-row items-center py-2 border-b border-gray-50 dark:border-gray-900/50 active:bg-gray-50 dark:active:bg-gray-900"
  >
    <View className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 items-center justify-center">
      {icon}
    </View>
    <View className="ml-4 flex-1">
      <Text className="text-xs text-gray-400 capitalize tracking-widest">{label}</Text>
      <Text className="text-sm font-bold dark:text-white mt-0.5">{value}</Text>
    </View>
    <ChevronRight size={14} color="#d1d5db" />
  </Pressable>
);