import { MapPin, Search, SlidersHorizontal } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

const SearchHeader = ({ onSearch, onFilterOpen, onLocationOpen, selectedCity }) => (
  <View className="bg-white dark:bg-black px-4 py-4 ">
    <View className="flex-row justify-between items-center mb-4">
      <View>
        <Text className="text-3xl font-bold text-blue-950 dark:text-white">Fixr</Text>
        <Pressable onPress={onLocationOpen} className="flex-row items-center mt-1">
          <MapPin size={14} color="#3b82f6" />
          <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1 font-medium">
            {selectedCity}
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={onFilterOpen} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
        <SlidersHorizontal size={20} color="#6b7280" />
      </Pressable>
    </View>
    <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 rounded-2xl px-4 py-3">
      <Search size={20} color="#9ca3af" />
      <TextInput 
        placeholder="Search name, skill, or role..." 
        className="flex-1 ml-3 text-gray-800 dark:text-white"
        placeholderTextColor="#9ca3af"
        onChangeText={onSearch}
      />
    </View>
  </View>
);
export default SearchHeader