import { Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export default function TechnicianProfile({ route }) {
  // Assuming you'll pass technician data via navigation
  // For now, using placeholder data
  const navigation =useNavigation()

  const tech = {
    name: "Arjun Sharma",
    category: "Master Plumber",
    rating: 4.8,
    reviews: 124,
    experience: "8 Years",
    bio: "Expert in residential plumbing, leak detection, and water heater installations. I provide 24/7 emergency services with guaranteed satisfaction.",
    price: "₹499",
    skills: ["Pipe Repair", "Drain Cleaning", "Leak Detection", "Installation"]
  };

  return (
    <View className="bg-white flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. HEADER IMAGE & BACK BUTTON */}
        <View className="relative h-72 w-full">
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000' }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          <Pressable 
            className="absolute top-12 left-5 bg-white/80 p-2 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>

        {/* 2. PROFILE INFO CARD */}
        <View className="flex-1 bg-white -mt-10 rounded-t-[40px] px-6 pt-8">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-bold text-gray-950 font-barlow">{tech.name}</Text>
              <Text className="text-blue-600 font-semibold text-lg">{tech.category}</Text>
            </View>
            <View className="bg-yellow-100 px-3 py-1 rounded-full flex-row items-center">
              <Ionicons name="star" size={16} color="#EAB308" />
              <Text className="font-bold text-yellow-700 ml-1">{tech.rating}</Text>
            </View>
          </View>

          {/* 3. QUICK STATS */}
          <View className="flex-row justify-between my-6 border-y border-gray-100 py-4">
            <View className="items-center flex-1">
              <Text className="text-gray-400 text-xs uppercase tracking-widest">Experience</Text>
              <Text className="text-gray-900 font-bold text-lg">{tech.experience}</Text>
            </View>
            <View className="items-center flex-1 border-x border-gray-100">
              <Text className="text-gray-400 text-xs uppercase tracking-widest">Reviews</Text>
              <Text className="text-gray-900 font-bold text-lg">{tech.reviews}</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-gray-400 text-xs uppercase tracking-widest">Base Fee</Text>
              <Text className="text-gray-900 font-bold text-lg">{tech.price}</Text>
            </View>
          </View>

          {/* 4. ABOUT SECTION */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-2 font-barlow">About</Text>
            <Text className="text-gray-600 leading-6">
              {tech.bio}
            </Text>
          </View>

          {/* 5. SKILLS TAGS */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3 font-barlow">Specialities</Text>
            <View className="flex-row flex-wrap gap-2">
              {tech.skills.map((skill, index) => (
                <View key={index} className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <Text className="text-gray-700 font-medium">{skill}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* Bottom Padding for the sticky button */}
          <View className="h-24" />
        </View>
      </ScrollView>

      {/* 6. FIXED FOOTER ACTION BUTTON */}
      <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-5 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-400 text-sm font-medium">Starting from</Text>
          <Text className="text-2xl font-black text-gray-900">{tech.price}</Text>
        </View>
        <Pressable 
          className="bg-gray-950 px-8 py-4 rounded-2xl active:scale-95 transition-all"
        >
          <Text className="text-white font-bold text-lg">Book Now</Text>
        </Pressable>
      </View>
    </View>
  );
}