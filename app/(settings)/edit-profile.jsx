import React, { useState } from 'react';
import { View, Text, TextInput, Scrollview, TouchableOpacity, Switch, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSettings } from '@/store/authSlice';
import { useRouter } from 'expo-router';

export default function EditProfile() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state initialized with current user data
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    theme: user?.theme || 'light',
    isAvailable: user?.isAvailable || false,
    city: user?.location?.city || ''
  });

  const handleUpdate = async () => {
    try {
      // Structure the location properly for your Mongoose schema
      const payload = {
        ...formData,
        location: {
          ...user?.location,
          city: formData.city
        }
      };

      await dispatch(updateUserSettings(payload)).unwrap();
      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <Scrollview className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Edit Profile</Text>

      {/* Full Name */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-1">Full Name</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg"
          value={formData.fullName}
          onChangeText={(txt) => setFormData({ ...formData, fullName: txt })}
        />
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-1">Email Address</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(txt) => setFormData({ ...formData, email: txt })}
        />
      </View>

      {/* City */}
      <View className="mb-4">
        <Text className="text-gray-600 mb-1">City</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg"
          value={formData.city}
          onChangeText={(txt) => setFormData({ ...formData, city: txt })}
        />
      </View>

      {/* Theme Toggle */}
      <View className="flex-row justify-between items-center mb-6 p-2 bg-gray-50 rounded-lg">
        <Text className="font-semibold text-gray-700">Dark Mode</Text>
        <Switch
          value={formData.theme === 'dark'}
          onValueChange={(val) => setFormData({ ...formData, theme: val ? 'dark' : 'light' })}
        />
      </View>

      {/* Technician Availability Toggle */}
      {user?.role === 'technician' && (
        <View className="flex-row justify-between items-center mb-6 p-2 bg-blue-50 rounded-lg">
          <View>
            <Text className="font-semibold text-blue-700">Available for Work</Text>
            <Text className="text-xs text-blue-600">Appear in search results</Text>
          </View>
          <Switch
            value={formData.isAvailable}
            onValueChange={(val) => setFormData({ ...formData, isAvailable: val })}
          />
        </View>
      )}

      {/* Save Button */}
      <TouchableOpacity 
        onPress={handleUpdate}
        disabled={loading}
        className={`p-4 rounded-xl ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
      >
        <Text className="text-white text-center font-bold">
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </Scrollview>
  );
}