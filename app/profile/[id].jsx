import { useTheme } from '@/context/ThemeContext';
import { CATEGORIES, technicians } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import * as NavigationBar from 'expo-navigation-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Linking, Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function TechnicianProfile() {
  const {activeScheme} = useTheme()
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const inset = useSafeAreaInsets()

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

   useEffect(() => { 
          NavigationBar?.setButtonStyleAsync(activeScheme === "dark" ? "light" : "dark");
    }, [activeScheme]);



  return (
    <View className={`flex-1 bg-white dark:bg-black`}  paddingBottom={inset.bottom} >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>

      <ScrollView showsVerticalScrollIndicator={false} >

        {/* HEADER */}
        <View className="h-72 w-screen " >
          <Pressable
              style={{ 
                top: (StatusBar.currentHeight ?? 0) + (Platform.OS === "ios" ? 40 : 20) 
              }}            
            className="absolute left-4 z-10 bg-white dark:bg-black/50 p-3 rounded-full shadow"
            onPress={() => router?.back()}
          >
            <Ionicons name="arrow-back" size={24} color={activeScheme==="light" ? "#000" : "#E5E7EB"} />
          </Pressable>
          

          {ImageWithProfile}
          <LinearGradient
              colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.4)", "transparent"]}
              className="absolute top-0 left-0 right-0 h-32"
            />
        </View>

        {/* PROFILE CARD */}
        <View className="flex-1 bg-white dark:bg-black -mt-10 rounded-t-[40px] px-6 pt-8">

          {/* NAME + RATING */}
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-3xl font-bold text-gray-950 dark:text-white font-barlow">
                {tech?.name}
              </Text>
              <Text className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                {tech?.profession}
              </Text>

              <Text className="text-gray-500 dark:text-gray-400 mt-1">
                {tech?.location?.address}, {tech?.location?.city}
              </Text>
            </View>

            <View className="bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full flex-row items-center">
              <Ionicons name="star" size={16} color="#EAB308" />
              <Text className="font-bold text-yellow-700  ml-1">
                {tech?.rating}
              </Text>
            </View>
          </View>

          {/* QUICK STATS */}
          <View className="flex-row justify-between my-6 border-y border-gray-100 dark:border-gray-800 py-4">

            <View className="items-center flex-1">
              <Text className="text-gray-400 dark:text-gray-500 text-xs uppercase">Experience</Text>
              <Text className="text-gray-900 dark:text-white font-bold text-lg">
                {tech?.experience_years} yrs
              </Text>
            </View>

            <View className="items-center flex-1 border-x border-gray-100 dark:border-gray-800">
              <Text className="text-gray-400 dark:text-gray-500 text-xs uppercase">Reviews</Text>
              <Text className="text-gray-900 dark:text-white font-bold text-lg">
                {tech?.total_reviews}
              </Text>
            </View>

            <View className="items-center flex-1">
              <Text className="text-gray-400 dark:text-gray-500 text-xs uppercase">Base Fees</Text>
              <Text className="text-gray-900 dark:text-white font-bold text-lg">
                {tech?.starting_price}
              </Text>
            </View>

          </View>

          {/* ABOUT */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-2 font-barlow">
              About
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 leading-6">
              {tech?.about}
            </Text>
          </View>

          {/* SKILLS */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3 font-barlow">
              Specialities
            </Text>

            <View className="flex-row flex-wrap gap-2">
              {tech?.skills?.map((skill, index) => (
                <View
                  key={index}
                  className="bg-gray-100 dark:bg-blue-950 px-4 py-2 rounded-2xl"
                >
                  <Text className="text-gray-700 dark:text-gray-300 font-medium">
                    {skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* VERIFICATION */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-3 font-barlow">
              Verification
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {tech?.is_verified && (
                <View className="flex-row items-center bg-green-100 dark:bg-green-950 px-3 py-2 rounded-xl">
                  <Ionicons name="checkmark-circle" size={16} color="green" />
                  <Text className="ml-2 text-green-700 dark:text-yellow-600 font-medium">
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
            <Text className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4 font-barlow">
              Recent Reviews
            </Text>

            {tech?.reviews?.map((review, index) => (
              <View key={index} className="mb-4">
                <View className="flex-row justify-between">
                  <Text className="font-semibold text-gray-800 dark:text-gray-400">
                    {review?.user_name}
                  </Text>
                  <Text className="text-yellow-600 dark:text- font-bold">
                    ⭐ {review?.rating}
                  </Text>
                </View>
                <Text className="text-gray-600 dark:text-gray-500mt-1">
                  {review?.comment}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* FOOTER CALL BUTTON */}
      <View style={{ bottom: inset.bottom }} className="absolute w-full bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 px-6 py-5 flex-row items-center justify-between">

        <View>
          <Text className="text-gray-400 dark:text-gray-300 text-sm">Inspection Fee</Text>
          <Text className="text-2xl font-bold text-black dark:text-white">
            ₹{tech?.starting_price}
          </Text>
        </View>

        <Pressable
          onPress={handleCall}
          className="bg-black dark:bg-white px-8 py-4 rounded-2xl active:scale-95"
        >
          <Text className="text-white dark:text-black font-bold text-lg">
            Call Now
          </Text>
        </Pressable>

      </View>

    </View>
  );
}