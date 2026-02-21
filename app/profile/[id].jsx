import { Ionicons } from '@expo/vector-icons'; // Ensure @expo/vector-icons is installed
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { CATEGORIES, technicians } from '../../src/utils/utils';

export default function TechnicianProfile() {

  const { id } = useLocalSearchParams();
  const tech = technicians?.find(t => t?.id === id) || technicians[0];
  const image = CATEGORIES.find(cat => cat?.name?.toLowerCase() === tech?.role?.toLowerCase());
  const Image = image?.icon;

  return (
    <View className="flex-1" >
      <StatusBar className={image?.color} barStyle='dark-content' translucent={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. HEADER IMAGE & BACK BUTTON */}
        <View className=" h-72 w-screen">
          {/* Logo if image not exist according to category */}
          {Image ? <View className={`rounded-2xl flex-1 items-center justify-center ${image?.color}`}>
                <Image size={28} color="black" />
              </View>: (
            <Text className="text-gray-500 font-bold text-xl">
            {tech?.name.charAt(0)}
          </Text>)}
          
          
        </View>

        {/* 2. PROFILE INFO CARD */}
        <View className="flex-1 bg-white -mt-10 rounded-t-[40px] px-6 pt-8">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-bold text-gray-950 font-barlow">{tech?.name}</Text>
              <Text className="text-blue-600 font-semibold text-lg">{tech?.role}</Text>
            </View>
            <View className="bg-yellow-100 px-3 py-1 rounded-full flex-row items-center">
              <Ionicons name="star" size={16} color="#EAB308" />
              <Text className="font-bold text-yellow-700 ml-1">{tech?.rating}</Text>
            </View>
          </View>

          {/* 3. QUICK STATS */}
          <View className="flex-row justify-between my-6 border-y border-gray-100 py-4">
            <View className="items-center flex-1">
              <Text className="text-gray-400 text-xs uppercase tracking-widest">Experience</Text>
              <Text className="text-gray-900 font-bold text-lg">{tech?.experience_years} years</Text>
            </View>
            <View className="items-center flex-1 border-x border-gray-100">
              <Text className="text-gray-400 text-xs uppercase tracking-widest">Reviews</Text>
              <Text className="text-gray-900 font-bold text-lg">{tech?.reviews}</Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-gray-400 text-xs uppercase tracking-widest">Base Fee</Text>
              <Text className="text-gray-900 font-bold text-lg">{tech?.basefees}</Text>
            </View>
          </View>

          {/* 4. ABOUT SECTION */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-2 font-barlow">About</Text>
            <Text className="text-gray-600 leading-6">
              {tech?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </Text>
          </View>

          {/* 5. SKILLS TAGS */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3 font-barlow">Specialities</Text>
            <View className="flex-row flex-wrap gap-2">
              {tech?.skills?.map((skill, index) => (
                <View key={index} className="bg-gray-100 px-4 py-2 rounded-2xl">
                  <Text className="text-gray-700 font-medium">{skill?.name}</Text>
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
          <Text className="text-2xl font-black text-gray-900">{tech?.price}</Text>
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