import { useRouter } from "expo-router";
import { ChevronRight, MapPin, Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import { CATEGORIES } from "@/utils/utils";

export default function TechnicianCard({ technician }) {
  const router = useRouter();

  if (!technician) return null;

  const categoryMatch = CATEGORIES.find(
    cat =>
      cat?.name?.toLowerCase() ===
      technician?.role?.toLowerCase()
  );

  const Icon = categoryMatch?.icon;

  const firstLetter = technician?.name
    ? technician.name.charAt(0).toUpperCase()
    : "?";
  
     const image = CATEGORIES.find(
        cat => cat?.name?.toLowerCase() === technician?.profession?.toLowerCase()
      );
    
    
      const ImageWithProfile = technician?.profile_image ? (
        <Image source={{ uri: technician.profile_image }} className='w-full h-full rounded-2xl' />
      ) : (
        Icon ? (
            <Icon
              size={28}
              color={categoryMatch?.iconColor || "#6b7280"}
            />
          ) : (
            <Text className="text-gray-500 font-bold text-xl">
              {firstLetter}
            </Text>))

  return (
    <View className="bg-white dark:bg-black rounded-3xl p-4 mb-4 border border-gray-100 dark:border-gray-800 shadow-sm">
      <View className="flex-row items-start">
        
        {/* Profile Icon */}
        <View
          className={`w-16 h-16 rounded-2xl items-center justify-center ${
            categoryMatch?.color || "bg-gray-200"
          }`}
        >
          {ImageWithProfile}
        </View>

        {/* Info Section */}
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text className="text-lg font-bold text-gray-950 dark:text-gray-300 leading-tight">
                {technician?.name || "Unknown"}
              </Text>

              <Text className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-0.5">
                {technician?.profession || "Technician"}
              </Text>
            </View>

            {/* Rating */}
            <View className="flex-row items-center bg-yellow-50 dark:bg-yellow-950 px-2 py-1 rounded-lg">
              <Star size={14} color="#EAB308" fill="#EAB308" />
              <Text className="ml-1 text-yellow-700 dark:text-yellow-300 font-bold text-xs">
                {technician?.rating ?? "0.0"}
              </Text>
            </View>
          </View>

          {/* Experience + Distance */}
          <View className="flex-row items-center mt-2 flex-wrap">
            <MapPin size={14} color="#6b7280" />

            <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1 mr-2">
              {technician?.experience_years ?? 0} Years Experience
            </Text>

            {technician?.distance && (
              <Text className="text-blue-600 dark:text-blue-400 text-xs font-semibold">
                • {technician.distance} km away
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Skills */}
      {technician?.skills?.length > 0 && (
        <View className="flex-row flex-wrap mt-4 gap-2">
          {technician.skills.slice(0, 3).map((skill, index) => (
            <View
              key={index}
              className="bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full"
            >
              <Text className="text-gray-600 dark:text-gray-300 text-[10px] font-semibold uppercase tracking-wider">
                {skill?.name || skill}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View className="h-[1px] bg-gray-100 dark:bg-gray-800 w-full my-4" />

      {/* Footer */}
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 dark:text-gray-500 text-xs italic flex-1">
          Verified Professional
        </Text>

        <Pressable
          className="flex-row items-center bg-black dark:bg-gray-900 px-5 py-3 rounded-2xl active:opacity-80"
          onPress={() => {
            if (technician?.id) {
              router.push(`/profile/${technician.id}`);
            }
          }}
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