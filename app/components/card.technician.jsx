import { useRouter } from "expo-router";
import { ChevronRight, MapPin, Star } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function TechnicianCard({ technician }) {
  const router = useRouter();
  
  return (
    <View className="bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm">
      <View className="flex-row items-start">
        {/* Profile Image placeholder */}
        <View className="w-16 h-16 bg-gray-200 rounded-2xl items-center justify-center">
          <Text className="text-gray-500 font-bold text-xl">
            {technician.name.charAt(0)}
          </Text>
        </View>

        {/* Info Section */}
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-gray-950" >
              {technician.name}
            </Text>
            <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={14} color="#EAB308" fill="#EAB308" />
              <Text className="ml-1 text-yellow-700 font-bold text-xs">{technician.rating}</Text>
            </View>
          </View>

          <Text className="text-blue-600 font-medium text-sm mt-0.5">{technician.role}</Text>
          
          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#6b7280" />
            <Text className="text-gray-500 text-xs ml-1">{technician.experience_years} Years Experience</Text>
          </View>
        </View>
      </View>

      {/* Nested Skills Section */}
      <View className="flex-row flex-wrap mt-4 gap-2">
        {technician.skills.slice(0, 3).map((skill, index) => (
          <View key={index} className="bg-gray-100 px-3 py-1.5 rounded-full">
            <Text className="text-gray-600 text-[11px] font-medium">{skill.name}</Text>
          </View>
        ))}
      </View>

      <View className="h-[1px] bg-gray-100 w-full my-4" />

      {/* Footer Action */}
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-xs italic">Verified Professional</Text>
        <Pressable 
          className="flex-row items-center justify-center bg-blue-950 px-5 py-3 rounded-2xl active:opacity-80"
          onPress={() => router.push({
            pathname: "/profile", // Points to app/profile.jsx
            params: { 
              id: technician.id, 
              name: technician.name,
              role: technician.role 
            }
          })}
        >
          <Text className="text-white font-bold text-sm mr-2">
            View Profile
          </Text>
          <ChevronRight size={14} color="white" strokeWidth={3} />
        </Pressable>
      </View>
    </View>
  );
}