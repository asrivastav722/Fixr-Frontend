import { useTheme } from "@/context/ThemeContext";
import { MapPin, Search, SlidersHorizontal, X } from "lucide-react-native";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const SearchHeader = ({ 
  onSearch, 
  searchQuery, 
  onFilterOpen, 
  onLocationOpen, 
  selectedCity = "Select Location" 
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Professional color palette based on theme
  const iconPrimary = isDark ? "#F4F4F5" : "#18181B"; // Zinc 100 / Zinc 950
  const iconSecondary = "#71717a"; // Zinc 500
  const placeholderColor = isDark ? "#52525b" : "#a1a1aa";

  return (
    <View 
      className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-4 "
    >
      {/* 1. TOP ROW: Brand & Secondary Action (Filter) */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-4xl font-roboto-bold text-zinc-950 dark:text-zinc-50 tracking-tighter">
          Fixr
        </Text>
        
        <Pressable 
          onPress={onFilterOpen} 
          className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 active:scale-95 transition-all"
        >
          <SlidersHorizontal size={20} color={iconPrimary} />
        </Pressable>
      </View>

      {/* 2. MIDDLE ROW: Location Context (Fits content) */}
      <View className="mb-4">
        <Pressable 
          onPress={onLocationOpen} 
          className="flex-row items-center self-start py-1.5 px-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 active:scale-95 transition-all"
        >
          <MapPin size={12} color={isDark ? "#60a5fa" : "#2563eb"} />
          <Text className="ml-1.5 text-[11px] font-roboto text-zinc-600 dark:text-zinc-400 font-medium">
            {selectedCity}
          </Text>
        </Pressable>
      </View>

      {/* 3. BOTTOM ROW: Primary Action (Search Bar) */}
      <View>
        <View 
          className="flex-row items-center bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 h-14 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500/50"
        >
          <Search size={18} color={iconSecondary} />
          
          <TextInput 
            value={searchQuery}
            placeholder="Search name, type & skill..." 
            className="flex-1 ml-3 text-base font-inter text-zinc-900 dark:text-zinc-100 p-0"
            placeholderTextColor={placeholderColor}
            onChangeText={onSearch}
            returnKeyType="search"
            cursorColor={isDark ? "#fff" : "#000"}
            style={{ textAlignVertical: 'center' }} 
          />

          {searchQuery?.length > 0 && (
            <Pressable 
              onPress={() => onSearch("")} 
              className="p-2 active:opacity-50"
            >
              <X size={18} color={iconSecondary} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchHeader;