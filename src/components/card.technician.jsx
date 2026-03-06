import { useTheme } from "@/context/ThemeContext";
import { CATEGORIES } from "@/utils/utils";
import { useRouter } from "expo-router";
import { ChevronRight, MapPin, Star } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

export default function TechnicianCard({ technician }) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!technician) return null;

  // Logic for finding category matches and icons
  const categoryMatch = CATEGORIES.find(
    (cat) => cat?.name?.toLowerCase() === technician?.role?.toLowerCase()
  );

  const Icon = categoryMatch?.icon;
  const firstLetter = technician?.name ? technician.name.charAt(0).toUpperCase() : "?";

  // Dynamic Avatar Logic
  const ImageWithProfile = technician?.profile_image ? (
    <Image 
      source={{ uri: technician.profile_image }} 
      className="w-full h-full rounded-2xl" 
      resizeMode="cover"
    />
  ) : Icon ? (
    <Icon size={28} color={categoryMatch?.iconColor || (isDark ? "#a1a1aa" : "#71717a")} />
  ) : (
    <Text className="text-zinc-500 font-bold text-2xl font-poppins">{firstLetter}</Text>
  );

  return (
    <View className="bg-white dark:bg-zinc-950 rounded-2xl p-5 mb-4 border border-zinc-200 dark:border-zinc-800 transition-all">
      <View className="flex-row items-start">
        {/* Profile Avatar Container */}
        <View
          className={`w-16 h-16 rounded-2xl items-center justify-center ${
            categoryMatch?.color || "bg-zinc-100 dark:bg-zinc-800"
          } overflow-hidden`}
        >
          {ImageWithProfile}
        </View>

        {/* Info Section */}
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text className="text-xl font-poppins font-bold text-zinc-950 dark:text-zinc-50 leading-tight">
                {technician?.name || "Unknown"}
              </Text>

              <Text className="text-blue-600 dark:text-blue-400 font-inter font-medium text-sm mt-0.5">
                {technician?.profession || "Technician"}
              </Text>
            </View>

            {/* Rating Badge */}
            <View className="flex-row items-center bg-yellow-50 dark:bg-yellow-900/30 px-2.5 py-1 rounded-xl">
              <Star size={12} color="#EAB308" fill="#EAB308" />
              <Text className="ml-1 text-yellow-700 dark:text-yellow-500 font-roboto-bold text-xs">
                {technician?.rating ?? "0.0"}
              </Text>
            </View>
          </View>

          {/* Metadata: Experience + Distance */}
          <View className="flex-row items-center mt-3 flex-wrap">
            <View className="flex-row items-center mr-3">
              <MapPin size={12} color="#71717a" />
              <Text className="text-zinc-500 dark:text-zinc-400 font-roboto text-xs ml-1">
                {technician?.experience_years ?? 0} Years Exp.
              </Text>
            </View>

            {technician?.distance && (
              <View className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                <Text className="text-zinc-600 dark:text-zinc-300 font-roboto-bold text-[10px]">
                  {technician.distance} KM AWAY
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Skills Tags */}
      {technician?.skills?.length > 0 && (
        <View className="flex-row flex-wrap mt-5 gap-2">
          {technician.skills.slice(0, 3).map((skill, index) => (
            <View
              key={index}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-3 py-1.5 rounded-lg"
            >
              <Text className="text-zinc-600 dark:text-zinc-400 font-inter text-[10px] font-bold uppercase tracking-wider">
                {skill?.name || skill}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Divider */}
      <View className="h-[1px] bg-zinc-100 dark:bg-zinc-900 w-full my-5" />

      {/* Footer / Call to Action */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-zinc-400 dark:text-zinc-500 font-roboto text-wrap text-[10px] uppercase tracking-widest">
           VERIFIED
          </Text>
        </View>

        <Pressable
          className="flex-row items-center bg-zinc-950 dark:bg-zinc-200 px-4 py-3 rounded-2xl active:scale-95 transition-all"
          onPress={() => {
            if (technician?.id) {
              router.push(`/profile/${technician.id}`);
            }
          }}
        >
          <Text className="text-zinc-200 dark:text-zinc-950 font-black text-[10px] uppercase tracking-[1px] mr-1">
            View Profile
          </Text>
          <ChevronRight size={14} color={isDark ? "black" : "white"} strokeWidth={3} />
        </Pressable>
      </View>
    </View>
  );
}