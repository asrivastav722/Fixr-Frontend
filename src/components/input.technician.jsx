import { Filter, MapPin, Search } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";

const words = ["Professionals...", "Plumbers...", "Electricians...", "Carpenters..."];

const TechnicianInput = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Fade out and slide up
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -10, duration: 400, useNativeDriver: true }),
      ]).start(() => {
        // 2. Change word
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        
        // 3. Reset position to bottom for next word
        slideAnim.setValue(10);
        
        // 4. Fade in and slide to center
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="p-4 flex-col gap-2">
      <View className="flex-row items-stretch gap-2">
        
        <View className="flex-1 flex-row items-center border border-gray-300 rounded-2xl bg-gray-50 overflow-hidden">
          {/* Animated Placeholder Layer */}
          {inputValue === "" && (
            <View className="absolute p-3 flex-row items-center pointer-events-none">
              <Text className="text-gray-500 text-base">Find </Text>
              <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                <Text className="text-gray-500 text-base">
                  {words[currentWordIndex]}
                </Text>
              </Animated.View>
            </View>
          )}

          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            className="flex-1 p-3 text-base text-gray-900 bg-transparent"
            cursorColor="#172554"
          />
        </View>

        <Pressable className="bg-blue-950 px-3 rounded-2xl items-center justify-center active:opacity-80">
          <Search color="white"/>
        </Pressable>
      </View>
      <View className="flex-row gap-2 items-stretch">
      <Pressable className="border border-white rounded-2xl px-2 py-1 items-center flex-row flex-1">
          <MapPin size={14} color="white"/>
          <Text className="p-2 text-center text-white">Location</Text>
        </Pressable>
      <Pressable className="border border-white rounded-2xl p-2 items-center flex-row">
          <Filter size={14} color="white"/>
          <Text className="p-2 text-center text-white">Filters</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TechnicianInput;