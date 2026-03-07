import React, { useState } from 'react';
import { 
  View, Text, TextInput, ScrollView, Switch, Alert, 
  ActivityIndicator, Image, Platform, KeyboardAvoidingView, 
  TouchableWithoutFeedback, Keyboard, Pressable 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '@/store/authSlice';
import { useRouter, Stack } from 'expo-router';
import { Camera, ChevronLeft, MapPin, Mail, User as UserIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';

export default function EditProfile() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    city: user?.location?.city || '',
    address: user?.location?.address || '',
    profileImage: user?.profileImage || '',
    isAvailable: user?.isAvailable || false,
  });

  const handleUpdate = async () => {
    try {
      await dispatch(updateUserSettings({ 
        type: 'personal_details', 
        value: {
          fullName: formData.fullName,
          email: formData.email,
          city: formData.city,
          address: formData.address,
          profileImage: formData.profileImage,
        } 
      })).unwrap();

      if (formData.isAvailable !== user.isAvailable) {
        await dispatch(updateUserSettings({ 
          type: 'availability', 
          value: formData.isAvailable 
        })).unwrap();
      }

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Update Failed", error || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-zinc-950"
    >
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <View 
              style={{ paddingTop: Platform.OS === 'ios' ? inset.top : inset.top + 10 }}
              className="flex-row bg-white dark:bg-zinc-950 items-center px-4 pb-4 border-b border-zinc-100 dark:border-zinc-900"
            >
              <Pressable
                onPress={() => router.back()}
                className="p-2 mr-2 rounded-full active:scale-90"
              >
                <ChevronLeft size={24} color={isDark ? '#fff' : '#000'} />
              </Pressable>
              <Text className="font-poppins font-bold text-xl text-zinc-900 dark:text-zinc-50">
                Edit Profile
              </Text>
            </View>
          ),
        }}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          className="flex-1 bg-white dark:bg-zinc-950"
          contentContainerStyle={{ paddingBottom: inset.bottom + 40, paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* PROFILE IMAGE SECTION */}
          <View className="items-center mt-8 mb-10">
            <View className="relative">
              <Image 
                source={{ uri: formData.profileImage || 'https://i.pravatar.cc/150' }} 
                className="w-32 h-32 rounded-3xl bg-zinc-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 shadow-xl"
              />
              <Pressable 
                onPress={() => Alert.alert("Upload", "Select Image Source")}
                className="absolute -bottom-2 -right-2 bg-blue-600 p-3 rounded-2xl border-4 border-white dark:border-zinc-900 shadow-lg active:scale-90"
              >
                <Camera size={20} color="white" />
              </Pressable>
            </View>
          </View>

          {/* FORM FIELDS */}
          <View className="gap-y-6">
            <View>
              <Label text="Full Name" icon={<UserIcon size={14} color="#71717a" />} />
              <CustomInput
                value={formData.fullName}
                onChangeText={(t) => setFormData({...formData, fullName: t})}
                placeholder="John Doe"
                isDark={isDark}
              />
            </View>

            <View>
              <Label text="Email Address" icon={<Mail size={14} color="#71717a" />} />
              <CustomInput
                value={formData.email}
                onChangeText={(t) => setFormData({...formData, email: t})}
                placeholder="john@example.com"
                keyboardType="email-address"
                isDark={isDark}
              />
            </View>

            <View className="flex-row gap-x-4">
              <View className="flex-1">
                <Label text="City" icon={<MapPin size={14} color="#71717a" />} />
                <CustomInput
                  value={formData.city}
                  onChangeText={(t) => setFormData({...formData, city: t})}
                  placeholder="Mumbai"
                  isDark={isDark}
                />
              </View>
            </View>

            <View>
              <Label text="Street Address" icon={<MapPin size={14} color="#71717a" />} />
              <CustomInput
                value={formData.address}
                onChangeText={(t) => setFormData({...formData, address: t})}
                placeholder="Apartment, Street, Landmark"
                multiline
                numberOfLines={3}
                style={{ height: 100, textAlignVertical: 'top' }}
                isDark={isDark}
              />
            </View>
          </View>

          {/* TECHNICIAN STATUS */}
          {user?.roles?.includes('technician') && (
            <View className="flex-row justify-between items-center mt-8 p-5 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
              <View className="flex-1 pr-4">
                <Text className="font-poppins font-bold text-zinc-900 dark:text-zinc-100 text-base">Available for Hire</Text>
                <Text className="text-xs font-roboto text-zinc-500 dark:text-zinc-400 mt-1">Status determines if you appear in search results</Text>
              </View>
              <Switch
                value={formData.isAvailable}
                onValueChange={(v) => setFormData({...formData, isAvailable: v})}
                trackColor={{ false: "#d4d4d8", true: "#3b82f6" }}
              />
            </View>
          )}

          {/* UPDATE BUTTON */}
          <Pressable 
            onPress={handleUpdate}
            disabled={loading}
            className={`mt-10 py-5 rounded-2xl shadow-lg active:scale-[0.98] ${
              loading ? 'bg-zinc-400' : 'bg-black dark:bg-white'
            }`}
          >
            {loading ? (
              <ActivityIndicator color={isDark ? "black" : "white"} />
            ) : (
              <Text className={`text-center font-black text-xs uppercase tracking-[2px] ${
                isDark ? 'text-black' : 'text-white'
              }`}>
                Save Changes
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Internal Helper Components for Cleanliness
const Label = ({ text, icon }) => (
  <View className="flex-row items-center mb-2 ml-1">
    {icon}
    <Text className="text-zinc-500 dark:text-zinc-400 font-roboto-bold text-[10px] uppercase tracking-widest ml-1.5">
      {text}
    </Text>
  </View>
);

const CustomInput = ({ isDark, ...props }) => (
  <TextInput
    {...props}
    placeholderTextColor={isDark ? "#52525b" : "#a1a1aa"}
    className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 font-inter text-base focus:border-blue-500/50"
  />
);