import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Switch, Alert, ActivityIndicator, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '@/store/authSlice';
import { useRouter, Stack } from 'expo-router';
import { Camera } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditProfile() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const inset = useSafeAreaInsets();

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
      // ONE SINGLE DISPATCH for all personal info
      await dispatch(updateUserSettings({ 
        type: 'personal_details', 
        value: {
          fullName: formData.fullName,
          email: formData.email,
          city: formData.city,
          profileImage: formData.profileImage,
          address: formData.address
        } 
      })).unwrap();

      // Separate call only for the status toggle (standard practice)
      if (formData.isAvailable !== user.isAvailable) {
        await dispatch(updateUserSettings({ 
          type: 'availability', 
          value: formData.isAvailable 
        })).unwrap();
      }

      Alert.alert("Success", "Profile updated!");
      router.back();
    } catch (error) {
      Alert.alert("Update Failed", error);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <Stack.Screen options={{ title: 'Edit Profile' }} />
      
      <ScrollView 
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: inset.bottom + 20 }}
      >
        {/* Profile Image Picker Header */}
        <View className="items-center mt-8 mb-10">
          <View className="relative">
            <Image 
              source={{ uri: formData.profileImage || 'https://i.pravatar.cc/150' }} 
              className="w-32 h-32 rounded-full border-4 border-blue-500 bg-gray-200"
            />
            <TouchableOpacity 
              onPress={() => Alert.alert("Upload", "Trigger ImagePicker & Cloudinary logic here")}
              className="absolute bottom-0 right-0 bg-blue-600 p-2.5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
            >
              <Camera size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Inputs Section */}
        <View className="gap-y-5">
          <View>
            <Text className="text-gray-500 dark:text-gray-400 font-semibold mb-2 ml-1">Full Name</Text>
            <TextInput
              className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-base"
              value={formData.fullName}
              onChangeText={(t) => setFormData({...formData, fullName: t})}
            />
          </View>

          <View>
            <Text className="text-gray-500 dark:text-gray-400 font-semibold mb-2 ml-1">Email Address</Text>
            <TextInput
              className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-base"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(t) => setFormData({...formData, email: t})}
            />
          </View>

          <View>
            <Text className="text-gray-500 dark:text-gray-400 font-semibold mb-2 ml-1">City</Text>
            <TextInput
              className="bg-gray-50 dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-base"
              value={formData.city}
              onChangeText={(t) => setFormData({...formData, city: t})}
            />
          </View>
        </View>

        {/* Technician Guard */}
        {user?.roles?.includes('technician') && (
          <View className="flex-row justify-between items-center mt-8 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
            <View className="flex-1 pr-4">
              <Text className="font-bold text-blue-700 dark:text-blue-400 text-base">Available for Hire</Text>
              <Text className="text-xs text-blue-600 dark:text-blue-500 mt-1">Appear in customer search results</Text>
            </View>
            <Switch
              value={formData.isAvailable}
              onValueChange={(v) => setFormData({...formData, isAvailable: v})}
              trackColor={{ false: "#cbd5e1", true: "#3b82f6" }}
            />
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity 
          onPress={handleUpdate}
          disabled={loading}
          activeOpacity={0.8}
          className={`mt-10 p-5 rounded-2xl shadow-md ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">Update Profile</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}