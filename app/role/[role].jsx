import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import TechnicianCard from "../../src/components/card.technician";
import { technicians } from "../../src/utils/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RoleTechniciansPage() {
  const { role } = useLocalSearchParams();
  const [search, setSearch] = useState("");
  const inset = useSafeAreaInsets();

  const formattedRole = role?.toString()?.toLowerCase();

  // 🎯 Filter By Role + Search
  const filteredTechnicians = useMemo(() => {
    return technicians
      ?.filter(
        tech =>
          tech?.profession?.toLowerCase() === formattedRole &&
          tech?.availability?.is_available_now === true
      )
      ?.filter(tech =>
        tech?.name?.toLowerCase().includes(search.toLowerCase())
      )
      ?.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }, [role, search]);

  return (
    <View className="flex-1 bg-black" paddingBottom={inset.bottom} paddingTop={inset.top} >
      <View className="p-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-950 text-capitalize">
          {formattedRole.charAt(0).toUpperCase() + formattedRole.slice(1)}s Near You
        </Text>

        {/* 🔎 Search Bar */}
        <TextInput
          placeholder={`Search ${formattedRole}s...`}
          value={search}
          onChangeText={setSearch}
          className="mt-4 bg-gray-100 px-4 py-3 rounded-2xl"
        />
      </View>

      <ScrollView className="p-4 bg-gray-100">
        {filteredTechnicians?.length > 0 ? (
          filteredTechnicians.map(tech => (
            <TechnicianCard key={tech.id} technician={tech} />
          ))
        ) : (
          <View className="items-center mt-20">
            <Text className="text-gray-400 text-base">
              No {formattedRole}s found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}