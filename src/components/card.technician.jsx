import { useRouter } from "expo-router";
import { ChevronRight, MapPin, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { CATEGORIES } from "../utils/utils";

export default function TechnicianCard({ technician }) {
  const router = useRouter();
  const categoryMatch = CATEGORIES.find(cat => cat?.name?.toLowerCase() === technician?.role?.toLowerCase());
  const Icon = categoryMatch?.icon;

  return (
    <View className="bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm">
      <View className="flex-row items-start">
        {/* Profile Icon / Image Section */}
        <View className={`w-16 h-16 rounded-2xl items-center justify-center ${categoryMatch?.color || 'bg-gray-200'}`}>
          {Icon ? (
            <Icon size={28} color={categoryMatch?.iconColor || "#6b7280"} />
          ) : (
            <Text className="text-gray-500 font-bold text-xl">
              {technician.name.charAt(0)}
            </Text>
          )}
        </View>

        {/* Info Section */}
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2"> 
              <Text className="text-lg font-bold text-gray-950 leading-tight">
                {technician.name}
              </Text>
              <Text className="text-blue-600 font-medium text-sm mt-0.5">
                {technician.role}
              </Text>
            </View>

            {/* Rating Badge */}
            <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={14} color="#EAB308" fill="#EAB308" />
              <Text className="ml-1 text-yellow-700 font-bold text-xs">
                {technician.rating}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center mt-2">
            <MapPin size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">
              {technician?.experience_years} Years Experience
            </Text>
          </View>
        </View>
      </View>

      {/* Skills Tags */}
      <View className="flex-row flex-wrap mt-4 gap-2">
        {technician?.skills?.slice(0, 3).map((skill, index) => (
          <View key={index} className="bg-gray-100 px-3 py-1.5 rounded-full">
            <Text className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider">
              {skill?.name}
            </Text>
          </View>
        ))}
      </View>

      <View className="h-[1px] bg-gray-100 w-full my-4" />

      {/* Footer Action */}
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-xs italic">Verified Professional</Text>
        
        <Pressable 
          className="flex-row items-center bg-blue-950 px-5 py-3 rounded-2xl active:opacity-80"
          onPress={() => router.push(`/profile/${technician?.id}`)}
        >
          <Text className="text-white font-bold text-sm mr-2">View Profile</Text>
          <ChevronRight size={14} color="white" strokeWidth={3} />
        </Pressable>
      </View>
    </View>
  );
}