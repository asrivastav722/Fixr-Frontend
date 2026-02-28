import React, { useState } from 'react';
import { Modal, View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/context/ThemeContext'; // Your context
import { Check, Moon, Sun, Monitor } from 'lucide-react-native';

export default function ThemeModal({ visible, onClose }) {
  const { theme, changeTheme } = useTheme();

  const options = [
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'dark', label: 'Dark Mode', icon: Moon },
    // { id: 'system', label: 'System Setting', icon: Monitor },
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View className="bg-white dark:bg-slate-900 rounded-t-3xl p-6 pb-10">
              <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Appearance
              </Text>

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
                    className={`flex-row items-center justify-between p-4 mb-2 rounded-2xl ${
                      isSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <View className="flex-row items-center">
                      <Icon size={20} color={isSelected ? '#6b7280' : '#6b7280'} />
                      <Text className={`ml-3 text-base font-medium ${
                        isSelected ? 'text-blue-900 dark:text-blue-200' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {opt.label}
                      </Text>
                    </View>
                    {isSelected && <Check size={20} color="#172554" strokeWidth={3} />}
                  </Pressable>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}