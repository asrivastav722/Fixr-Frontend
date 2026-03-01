import { useRouter } from "expo-router";
import { View,Text,Pressable, } from "react-native";

export const GuestView = () => {
    const router =useRouter()

  return <View className="flex-1 bg-white dark:bg-[#080808] justify-center px-10">
    <Text className="text-[10px] font-black text-blue-600 uppercase tracking-[6px] mb-2">Access.Denied</Text>
    <Text className="text-4xl font-bold dark:text-white tracking-tighter">Fixr Official</Text>
    <Text className="text-zinc-500 mt-4 mb-10 leading-6 text-base">
      Please authenticate to access your professional service dashboard and system tools.
    </Text>
    <Pressable 
      onPress={() => router.push("/(auth)/entry")}
      className="bg-black dark:bg-white py-5 rounded-2xl items-center shadow-2xl"
    >
      <Text className="text-white dark:text-black font-black text-xs uppercase tracking-[2px]">Initialize Login</Text>
    </Pressable>
  </View>
};