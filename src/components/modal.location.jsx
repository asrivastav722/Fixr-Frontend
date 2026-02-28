import React, { useState } from "react";
import { FlatList, Modal, Pressable, Text, View, TextInput, ActivityIndicator, Alert, Linking } from "react-native";
import * as Location from "expo-location";
import { MapPinned, Target, Search, X } from "lucide-react-native";
import { INDIAN_CITIES } from "@/utils/utils";

export default function LocationModal({ visible, onClose, onSelect }) {
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = INDIAN_CITIES.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGetCurrentLocation = async () => {
    try {
      setIsLocating(true);
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (!canAskAgain) {
          Alert.alert("Permission Required", "Please enable location in settings.", [
            { text: "Settings", onPress: () => Linking.openSettings() },
            { text: "Cancel" }
          ]);
        }
        return;
      }

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      onSelect({ type: "current", coords: location.coords });
      onClose();
    } catch (e) {
      Alert.alert("Error", "Could not fetch location.");
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <Modal animationType="slide" transparent statusBarTranslucent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 bg-black/60 justify-end">
        <View className="bg-white dark:bg-gray-900 rounded-t-[40px] p-6 h-[80%]">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold dark:text-white">Select Location</Text>
            <Pressable onPress={onClose} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <X size={20} color="#9ca3af" />
            </Pressable>
          </View>

          <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-4 rounded-2xl mb-4">
            <Search size={18} color="#9ca3af" />
            <TextInput
              placeholder="Search city..."
              placeholderTextColor="#9ca3af"
              className="flex-1 h-12 ml-2 dark:text-white"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Pressable onPress={handleGetCurrentLocation} className="flex-row items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-4">
            {isLocating ? <ActivityIndicator color="#3b82f6" /> : <Target size={20} color="#3b82f6" />}
            <Text className="ml-3 font-bold text-blue-600 dark:text-blue-400">Use Current Location</Text>
          </Pressable>

          <FlatList 
            data={filteredCities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable onPress={() => { onSelect({ type: "city", name: item }); onClose(); }} className="flex-row items-center py-4 border-b border-gray-50 dark:border-gray-800">
                <MapPinned size={18} color="#9ca3af" />
                <Text className="ml-4 text-gray-700 dark:text-gray-200">{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}