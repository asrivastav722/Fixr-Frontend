import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TechnicianCard from "../../src/components/card.technician";
import { useTheme } from "../../src/context/ThemeContext";
import { technicians } from "../../src/utils/utils";

import * as Haptics from "expo-haptics";
import { Search, SlidersHorizontal, X } from "lucide-react-native";
import { Modal } from "react-native";

export default function RoleTechniciansPage() {
  const { role } = useLocalSearchParams();
  const inset = useSafeAreaInsets();
  const { theme } = useTheme();

  // States
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const formattedRole = role?.toString()?.toLowerCase();
  const isDark = theme === "dark";

  // Recommendations logic (Top rated in this category)
  const recommendations = useMemo(() => {
    return technicians
      .filter(t => t?.profession?.toLowerCase() === formattedRole && t.rating >= 4.5)
      .slice(0, 3);
  }, [formattedRole]);

  const filteredTechnicians = useMemo(() => {
    return technicians
      ?.filter(tech =>
          tech?.profession?.toLowerCase() === formattedRole &&
          tech?.rating >= minRating &&
          (search === "" || tech?.name?.toLowerCase().includes(search.toLowerCase()))
      )
      ?.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [role, search, minRating]);

  const handleHeaderAction = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View className="flex-1 dark:bg-black bg-white" style={{ paddingTop: inset.top,paddingBottom:inset.bottom }}>
      
      {/* --- HEADER --- */}
      <View className="px-4 py-2 flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800">
        {!isSearchActive ? (
          <>
            <View className="flex-row items-center">
              <Pressable onPress={() => router.back()} className="mr-3">
                <ChevronLeft size={28} color={isDark ? "#fff" : "#000"} />
              </Pressable>
              <Text className="text-xl font-bold dark:text-white capitalize">
                {formattedRole}s
              </Text>
            </View>
            <View className="flex-row gap-2">
              <Pressable 
                onPress={() => { handleHeaderAction(); setIsSearchActive(true); }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <Search size={20} color={isDark ? "#fff" : "#000"} />
              </Pressable>
              <Pressable 
                onPress={() => { handleHeaderAction(); setIsFilterVisible(true); }}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
              >
                <SlidersHorizontal size={20} color={isDark ? "#fff" : "#000"} />
              </Pressable>
            </View>
          </>
        ) : (
          <View className="flex-row items-center flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-1">
            <Search size={18} color="#9ca3af" />
            <TextInput
              autoFocus
              className="flex-1 ml-2 h-10 dark:text-white"
              placeholder={`Find ${formattedRole}...`}
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
            <Pressable onPress={() => { setIsSearchActive(false); setSearch(""); }}>
              <X size={18} color="#9ca3af" />
            </Pressable>
          </View>
        )}
      </View>

      {/* --- RECOMMENDATIONS (Only when searching) --- */}
      {isSearchActive && search.length === 0 && (
        <View className="p-4 bg-white dark:bg-black">
          <Text className="text-xs font-bold text-gray-400 uppercase mb-3">Recommended {formattedRole}s</Text>
          {recommendations.map(item => (
            <Pressable key={item.id} onPress={() => setSearch(item.name)} className="py-2 border-b border-gray-50 dark:border-gray-900">
              <Text className="dark:text-white">{item.name} ⭐ {item.rating}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 p-4">
        {filteredTechnicians.map(tech => (
          <TechnicianCard key={tech.id} technician={tech} />
        ))}
      </ScrollView>

      {/* --- FILTER MODAL --- */}
      <Modal visible={isFilterVisible} animationType="slide" backdropColor="black/50">
        <View className="flex-1 justify-end">
          <View className="bg-white dark:bg-gray-900 p-6 rounded-t-3xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold dark:text-white">Filters</Text>
              <Pressable onPress={() => setIsFilterVisible(false)}>
                <X size={24} color={isDark ? "#fff" : "#000"} />
              </Pressable>
            </View>

            <Text className="font-semibold dark:text-gray-300 mb-3">Minimum Rating</Text>
            <View className="flex-row gap-2 mb-8">
              {[0, 3, 4, 4.5].map((val) => (
                <Pressable 
                  key={val} 
                  onPress={() => setMinRating(val)}
                  className={`px-4 py-2 rounded-xl border ${minRating === val ? 'bg-blue-950 border-blue-950' : 'border-gray-200 dark:border-gray-700'}`}
                >
                  <Text className={minRating === val ? 'text-white' : 'text-gray-600 dark:text-gray-400'}>
                    {val === 0 ? 'All' : `${val}+ ⭐`}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable 
              onPress={() => setIsFilterVisible(false)}
              className="bg-blue-950 py-4 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-lg">Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}