import { MapPinned, Target, View } from "lucide-react-native";
import { FlatList, Modal, Pressable } from "react-native";
import { INDIAN_CITIES } from "../utils/utils";
import { Text } from "react-native";
import { useState } from "react";

const LocationModal = ({ visible, onClose, onSelect }) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = async () => {
    try {
      setIsLocating(true);
      let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
      // 2. Use canAskAgain to decide the UI
      if (!canAskAgain) {
        // The user clicked "Don't Allow" and "Don't ask again" 
        // We MUST send them to settings now.
        alert(
          "Location Permission Required",
          "You've disabled location. Please enable it in your phone settings to see technicians near you.",
          [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
        );
      } else {
        // We can try to ask again later or show a custom "Please allow" UI
        console.log("Permission denied, but we can ask again later.");
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverse.length > 0) {

        onSelect(reverse);
        onClose();
      }
    }
    } catch (e) { 
      alert("Error fetching location"); 
    } 
    finally { setIsLocating(false); }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 bg-black/60 justify-center p-6">
        <View className="bg-white dark:bg-gray-900 rounded-3xl p-4 max-h-[70%]">
          <Text className="text-lg font-bold mb-2 dark:text-white p-2">Select Location</Text>
          <Pressable onPress={handleGetCurrentLocation} className="flex-row items-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl mb-2">
            <Target size={18} color="#3b82f6" />
            <Text className="ml-3 font-bold text-blue-600">{isLocating ? "Locating..." : "Use Current Location"}</Text>
          </Pressable>
          <FlatList 
            data={INDIAN_CITIES}
            renderItem={({item}) => (
              <Pressable onPress={() => { onSelect(item); onClose(); }} className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800">
                <MapPinned size={18} color="#9ca3af" /><Text className="ml-3 dark:text-gray-200">{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};
export default LocationModal