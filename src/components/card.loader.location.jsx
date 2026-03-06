import React, { useEffect, useRef } from "react";
import { Animated, Text, View, useColorScheme } from "react-native";
import { MapPin } from "lucide-react-native";

const LocationLoader = () => {
  const isDark = useColorScheme() === 'dark';
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous pulsing animation
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolations for the "Radar" effect
  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.3, 0],
  });

  const primaryBlue = isDark ? "#3b82f6" : "#2563eb";

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-zinc-950">
      <View className="items-center justify-center">
        {/* Pulsing Rings */}
        <Animated.View
          style={{
            transform: [{ scale }],
            opacity,
            backgroundColor: primaryBlue,
          }}
          className="absolute w-16 h-16 rounded-full"
        />
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 2],
            }) }],
            opacity,
            backgroundColor: primaryBlue,
          }}
          className="absolute w-16 h-16 rounded-full"
        />

        {/* Central Icon Container */}
        <View className="w-16 h-16 rounded-full bg-blue-600 items-center justify-center shadow-lg shadow-blue-500/50">
          <MapPin size={28} color="white" />
        </View>
      </View>

      {/* Loading Text */}
      <View className="mt-10 items-center">
        <Text className="text-xl font-bold poppins text-zinc-900 dark:text-zinc-50">
          Finding Fixers
        </Text>
        <Text className="text-sm roboto text-zinc-500 dark:text-zinc-400 mt-1">
          Optimizing results for your area...
        </Text>
      </View>
    </View>
  );
};

export default LocationLoader;