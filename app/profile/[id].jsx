import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Linking, Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CATEGORIES, technicians } from '../../src/utils/utils';

export default function TechnicianProfile() {

  const { id } = useLocalSearchParams();
  const router = useRouter();
  const inset =  useSafeAreaInsets()

  const tech = technicians?.find(t => t?.id === id) || technicians[0];
  const image = CATEGORIES.find(
    cat => cat?.name?.toLowerCase() === tech?.profession?.toLowerCase()
  );

  const Icon = image?.icon;

  const handleCall = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL(`tel:${tech?.contact?.phone}`);
  };
  const ImageWithProfile = tech?.profile_image ? (
    <Image source={{ uri: tech.profile_image }} className='w-full h-full ' />
  ) : (
    <Icon size={60} color="black" />
  );




  return (
    <View className={`flex-1 bg-black`}  paddingBottom={inset.bottom} >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>

      <ScrollView showsVerticalScrollIndicator={false} >

        {/* HEADER */}
        <View className="h-72 w-screen " >
          {Platform.OS !== "ios" && <Pressable
            style={{top: StatusBar.currentHeight + 10}}
            className="absolute left-4 z-10 bg-white p-3 rounded-full shadow"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </Pressable>}

          {ImageWithProfile}
          <LinearGradient
              colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.4)", "transparent"]}
              className="absolute top-0 left-0 right-0 h-32"
            />
        </View>

        {/* PROFILE CARD */}
        <View className="flex-1 bg-white -mt-10 rounded-t-[40px] px-6 pt-8">

          {/* NAME + RATING */}
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-bold text-gray-950 font-barlow">
                {tech?.name}
              </Text>
              <Text className="text-blue-600 font-semibold text-lg">
                {tech?.role}
              </Text>

              <Text className="text-gray-500 mt-1">
                {tech?.location?.area}, {tech?.location?.city}
              </Text>
            </View>

            <View className="bg-yellow-100 px-3 py-1 rounded-full flex-row items-center">
              <Ionicons name="star" size={16} color="#EAB308" />
              <Text className="font-bold text-yellow-700 ml-1">
                {tech?.rating}
              </Text>
            </View>
          </View>

          {/* QUICK STATS */}
          <View className="flex-row justify-between my-6 border-y border-gray-100 py-4">

            <View className="items-center flex-1">
              <Text className="text-gray-400 text-xs uppercase">Experience</Text>
              <Text className="text-gray-900 font-bold text-lg">
                {tech?.experience_years} yrs
              </Text>
            </View>

            <View className="items-center flex-1 border-x border-gray-100">
              <Text className="text-gray-400 text-xs uppercase">Reviews</Text>
              <Text className="text-gray-900 font-bold text-lg">
                {tech?.reviews_count}
              </Text>
            </View>

            <View className="items-center flex-1">
              <Text className="text-gray-400 text-xs uppercase">Jobs done</Text>
              <Text className="text-gray-900 font-bold text-lg">
                {tech?.stats?.jobs_completed}
              </Text>
            </View>

          </View>

          {/* ABOUT */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-2 font-barlow">
              About
            </Text>
            <Text className="text-gray-600 leading-6">
              {tech?.about}
            </Text>
          </View>

          {/* SKILLS */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3 font-barlow">
              Specialities
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {tech?.skills?.map((skill, index) => (
                <View
                  key={index}
                  className="bg-gray-100 px-4 py-2 rounded-2xl"
                >
                  <Text className="text-gray-700 font-medium">
                    {skill?.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* VERIFICATION */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3 font-barlow">
              Verification
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {tech?.verification?.is_verified && (
                <View className="flex-row items-center bg-green-100 px-3 py-2 rounded-xl">
                  <Ionicons name="checkmark-circle" size={16} color="green" />
                  <Text className="ml-2 text-green-700 font-medium">
                    Verified
                  </Text>
                </View>
              )}

              {tech?.verification?.background_checked && (
                <View className="flex-row items-center bg-blue-100 px-3 py-2 rounded-xl">
                  <Ionicons name="shield-checkmark" size={16} color="#2563EB" />
                  <Text className="ml-2 text-blue-700 font-medium">
                    Background Checked
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* REVIEWS LIST */}
          <View style={{ paddingBottom: 100 }}>
            <Text className="text-xl font-bold text-gray-900 mb-4 font-barlow">
              Recent Reviews
            </Text>

            {tech?.reviews?.slice(0, 3).map((review, index) => (
              <View key={index} className="mb-4">
                <View className="flex-row justify-between">
                  <Text className="font-semibold text-gray-800">
                    {review?.user}
                  </Text>
                  <Text className="text-yellow-600 font-bold">
                    ⭐ {review?.rating}
                  </Text>
                </View>
                <Text className="text-gray-600 mt-1">
                  {review?.comment}
                </Text>
              </View>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* FOOTER CALL BUTTON */}
      <View style={{ bottom: inset.bottom }} className="absolute w-full bg-white border-t border-gray-100 px-6 py-5 flex-row items-center justify-between">

        <View>
          <Text className="text-gray-400 text-sm">Inspection Fee</Text>
          <Text className="text-2xl font-black text-gray-900">
            ₹{tech?.pricing?.inspection_fee}
          </Text>
        </View>

        <Pressable
          onPress={handleCall}
          className="bg-black px-8 py-4 rounded-2xl active:scale-95"
        >
          <Text className="text-white font-bold text-lg">
            Call Now
          </Text>
        </Pressable>

      </View>

    </View>
  );
}