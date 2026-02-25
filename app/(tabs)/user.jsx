import {
  Mail,
  Phone
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";

export default function MyProfilePage() {
  // 🔥 Replace with global state / auth context later
  const [user, setUser] = useState({
    id: "u1",
    name: "Akash Raj",
    email: "asrivastav722@gmail.com",
    phone: "+918081111867",
    role: "both",
    avatar: "https://i.pravatar.cc/150",
    bio: "Professional with 5+ years experience.",
    rating: 4.8,
    total_reviews: 34,
    jobs_completed: 120,
    jobs_hired: 8,
    experience_years: 5,
    availability: "available",
    skills: [{ name: "Wiring" }, { name: "Installation" }],
    location: {
      city: "Lagos",
      country: "Nigeria",
    },
  });

  const isTechnician =
    user.role === "technician" || user.role === "both";

  const isCustomer =
    user.role === "customer" || user.role === "both";

  const toggleAvailability = () => {
    setUser(prev => ({
      ...prev,
      availability:
        prev.availability === "available"
          ? "unavailable"
          : "available",
    }));
  };

  return (
    <View className="flex-1 dark:bg-gray-900 bg-gray-100">
      <ScrollView showsVerticalScrollIndicator={false}>
      
        {/* 👤 Profile Header */}
        <View className="bg-white dark:bg-black pt-2 pb-6 items-center">
          <Text className="text-2xl font-semibold text-gray-950 dark:text-gray-100 w-full text-left pb-6 px-3">Profile</Text>
          <Image
            source={{ uri: user.avatar }}
            className="w-28 h-28 rounded-3xl"
          />

          <Text className="text-2xl font-bold text-gray-950 dark:text-gray-100 mt-4">
            {user.name}
          </Text>

          <Text className="text-gray-500 dark:text-gray-400 mt-1">
            {user.location.city}, {user.location.country}
          </Text>

          {/* Role Badges */}
          <View className="flex-row mt-3">
            {isTechnician && (
              <View className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full mr-2">
                <Text className="text-blue-700 dark:text-blue-300 text-xs font-semibold">
                  Technician
                </Text>
              </View>
            )}

            {isCustomer && (
              <View className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                <Text className="text-green-700 dark:text-green-300 text-xs font-semibold">
                  Customer
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* 📊 Stats */}
        <View className="flex-row justify-around bg-white dark:bg-black mt-3 py-5">
          {isTechnician && (
            <>
              <View className="items-center">
                <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {user.jobs_completed}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">
                  Jobs Done
                </Text>
              </View>

              <View className="items-center">
                <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {user.rating}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">
                  Rating
                </Text>
              </View>
            </>
          )}

          {isCustomer && (
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {user.jobs_hired}
              </Text>
              <Text className="text-gray-500 dark:text-gray-400 text-xs">
                Hires Made
              </Text>
            </View>
          )}
        </View>

        {/* 🛠 Technician Section */}
        {isTechnician && (
          <View className="bg-white dark:bg-black mt-3 px-6 py-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Technician Settings
              </Text>

              <View className="flex-row items-center">
                <Text className="mr-2 text-gray-500 dark:text-gray-400 text-sm">
                  Available
                </Text>
                <Switch
                  value={user.availability === "available"}
                  onValueChange={toggleAvailability}
                />
              </View>
            </View>

            <Text className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {user.bio}
            </Text>

            <Text className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Skills
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <View
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full"
                >
                  <Text className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">
                    {skill.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 📇 Account Info */}
        <View className="bg-white dark:bg-black mt-3 px-6 py-5">
          <Text className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
            Account Information
          </Text>

          <View className="flex-row items-center mb-3">
            <Mail size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-600 dark:text-gray-300">
              {user.email}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Phone size={16} color="#6b7280" />
            <Text className="ml-2 text-gray-600 dark:text-gray-300">
              {user.phone}
            </Text>
          </View>
        </View>

        {/* ✏ Edit Profile */}
        <View className="px-6 mt-6">
          <Pressable className="bg-blue-950 dark:bg-blue-800 py-4 rounded-2xl items-center mb-4">
            <Text className="text-white  font-bold">
              Edit Profile
            </Text>
          </Pressable>

          <Pressable className="bg-red-100 dark:bg-red-900 py-4 rounded-2xl items-center">
            <Text className="text-red-600 dark:text-red-400 font-bold">
              Logout
            </Text>
          </Pressable>
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}