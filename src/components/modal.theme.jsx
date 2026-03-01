import React, { useEffect } from 'react';
import { Modal, View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Check, Moon, Sun } from 'lucide-react-native';
import { useTheme } from "@/context/ThemeContext"; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

export default function ThemeModal({ visible, onClose }) {
  const { theme, changeTheme } = useTheme();
  const inset = useSafeAreaInsets();
  
  const options = [
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'dark', label: 'Dark Mode', icon: Moon },
  ];


  // Inside your ThemeProvider useEffect:
  useEffect(() => {
    if (Platform.OS === 'android') {
      const isDark = theme === "dark";
        NavigationBar.setBackgroundColorAsync(isDark ? '#000000' : '#ffffff');
        NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    }
  }, [theme]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true} // Keeps status bar color consistent during transition
      onRequestClose={onClose}
    >
      {/* Background Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          
          {/* Modal Content */}
          <TouchableWithoutFeedback>
            <View 
              style={{ paddingBottom: inset.bottom > 0 ? inset.bottom : 24 }}
              className="bg-white dark:bg-slate-900 rounded-t-[32px] p-6 shadow-2xl"
            >
              {/* Drag Handle Indicator */}
              <View className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full self-center mb-6" />
              
              <Text className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Appearance
              </Text>

              <View className="gap-y-3">
                {options.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = theme === opt.id;

                  return (
                    <Pressable
                      key={opt.id}
                      onPress={() => {
                        changeTheme(opt.id);
                        onClose();
                      }}
                      className={`flex-row items-center justify-between p-4 rounded-2xl border ${
                        isSelected 
                          ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-800' 
                          : 'bg-gray-50 dark:bg-slate-800/50 border-transparent'
                      }`}
                    >
                      <View className="flex-row items-center">
                        {/* Icon Wrapper */}
                        <View className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                           <Icon size={20} color={isSelected ? "white" : "#64748b"} />
                        </View>
                        
                        <Text className={`ml-4 text-base font-semibold ${
                          isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {opt.label}
                        </Text>
                      </View>
                      
                      {/* Checkmark */}
                      {isSelected && (
                        <View className="bg-blue-500 rounded-full p-1">
                          <Check size={14} color="white" strokeWidth={4} />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}