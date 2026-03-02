import { MapPin, Search, SlidersHorizontal, X } from "lucide-react-native";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const SearchHeader = ({ 
  onSearch, 
  searchQuery, // Added to control the input value
  onFilterOpen, 
  onLocationOpen, 
  selectedCity = "Select Location" 
}) => {
  return (
    <View className="bg-main px-4 pt-6 pb-4 ">
      {/* Top Row: Brand & Location + Filter */}
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-1">
          <Text className="text-3xl text-hero">
            Fixr
          </Text>
          <Pressable 
            onPress={onLocationOpen} 
            accessibilityRole="button"
            accessibilityLabel="Change location"
            className="flex-row items-center mt-1 active:opacity-60"
          >
            <MapPin size={14} color="#3b82f6" />
            <Text className="text-dim text-xs ml-1 font-semibold">
              {selectedCity}
            </Text>
          </Pressable>
        </View>

        <Pressable 
          onPress={onFilterOpen} 
          accessibilityRole="button"
          accessibilityLabel="Open filters"
          className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-2xl active:scale-95 transition-transform"
        >
          <SlidersHorizontal size={20} color="#6b7280" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 dark:bg-zinc-900 rounded-2xl px-4 py-1 border border-transparent focus:border-blue-500">
        <Search size={18} color="#9ca3af" />
        <TextInput 
          value={searchQuery}
          placeholder="Search name, skill, or role..." 
          className="flex-1 ml-3 h-10 text-gray-800 dark:text-zinc-100 text-base"
          placeholderTextColor="#9ca3af"
          onChangeText={onSearch}
          returnKeyType="search"
        />
        {searchQuery?.length > 0 && (
          <Pressable onPress={() => onSearch("")} className="p-1">
            <X size={16} color="#9ca3af" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchHeader;