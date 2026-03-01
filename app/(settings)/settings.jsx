import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, Stack } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Globe,
  Lock,
  Trash2,
  User
} from "lucide-react-native";

// Custom Hooks & Context
import { useTheme } from "@/context/ThemeContext";
import { useLogout } from "@/hooks/useLogout";
import ThemeModal from "@/components/modal.theme";
import { useSelector } from "react-redux";

export default function SettingsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const { logout } = useLogout();

  // Get user roles from Redux state
  const user = useSelector((state) => state.auth.user);
  const roles = user?.roles || ['customer'];
  const isTechnician = roles.includes("technician");

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    jobAlerts: true,
    messageAlerts: true,
    twoFactor: false,
    locationSharing: true,
    profileVisible: true,
    autoAccept: false,
    availability: true,
  });

  const toggle = (key) =>
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));

  // --- Sub-Components ---
  const Section = ({ title, children }) => (
    <View className="bg-white dark:bg-black mt-4 px-6 py-4">
      <Text className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
        {title}
      </Text>
      {children}
    </View>
  );

  const SettingRow = ({ icon, label, right, onPress, subValue }) => (
    <Pressable 
      onPress={onPress} 
      className="flex-row justify-between items-center py-4 border-b border-gray-50 dark:border-gray-900 last:border-0"
    >
      <View className="flex-row items-center flex-1">
        {icon && <View className="w-8">{icon}</View>}
        <Text className="text-base text-gray-700 dark:text-gray-300 font-medium">
          {label}
        </Text>
      </View>
      <View className="flex-row items-center">
        {subValue && (
          <Text className="text-gray-400 dark:text-gray-500 mr-2 capitalize">
            {subValue}
          </Text>
        )}
        {right || <ChevronRight size={18} color="#9ca3af" />}
      </View>
    </Pressable>
  );
  

  return (
    <View className="flex-1 bg-white dark:bg-gray-900" paddingBottom={inset.bottom}>
      {/* Set StatusBar background to match header on Android */}
      <StatusBar 
        barStyle={theme === "dark" ? "light-content" : "dark-content"} 
        backgroundColor={theme === "dark" ? "#000" : "#fff"}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <View 
              style={{ paddingTop: inset.top + 10}}
              className="flex-row bg-white dark:bg-black items-center justify-start gap-3 w-full p-4 border-b border-gray-100 dark:border-gray-800"
            >
              <Pressable
                onPress={() => router.back()}
                className="rounded-full active:opacity-60 p-1"
              >
                <ChevronLeft size={28} color={theme === 'dark' ? '#fff' : '#000'} />
              </Pressable>

              <Text className="font-bold text-xl text-black dark:text-white">
                Settings
              </Text>
            </View>
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-gray-100 dark:bg-gray-900 pb-2"
      >
        {/* 👤 ACCOUNT */}
        <Section title="Account">
          <SettingRow
            onPress={() => router.push("/edit-profile")}
            icon={<User size={20} color={theme === 'dark' ? '#94a3b8' : '#6b7280'} />}
            label="Edit Profile"
          />
          <SettingRow
            icon={<Lock size={20} color={theme === 'dark' ? '#94a3b8' : '#6b7280'} />}
            label="Change Password"
          />
          <SettingRow
            icon={<Trash2 size={20} color="#ef4444" />}
            label="Delete Account"
          />
        </Section>

        {/* 🔔 NOTIFICATIONS */}
        <Section title="Notifications">
          <SettingRow
            label="Push Notifications"
            right={
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => toggle("pushNotifications")}
                trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
              />
            }
          />
          <SettingRow
            label="Job Alerts"
            right={
              <Switch
                value={settings.jobAlerts}
                onValueChange={() => toggle("jobAlerts")}
                trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
              />
            }
          />
        </Section>

        {/* 🛠 TECHNICIAN SETTINGS */}
        {isTechnician && (
          <Section title="Technician Tools">
            <SettingRow
              label="Active for Hire"
              right={
                <Switch
                  value={settings.availability}
                  onValueChange={() => toggle("availability")}
                  trackColor={{ false: "#d1d5db", true: "#10b981" }}
                />
              }
            />
            <SettingRow
              label="Auto-Accept Jobs"
              right={
                <Switch
                  value={settings.autoAccept}
                  onValueChange={() => toggle("autoAccept")}
                  trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
                />
              }
            />
            <SettingRow label="Service Radius" subValue="25 km" />
          </Section>
        )}

        {/* 💳 PAYMENTS */}
        <Section title="Payments">
          <SettingRow
            icon={<CreditCard size={20} color={theme === 'dark' ? '#94a3b8' : '#6b7280'} />}
            label="Saved Methods"
          />
          <SettingRow
            icon={<CreditCard size={20} color={theme === 'dark' ? '#94a3b8' : '#6b7280'} />}
            label="Transaction History"
          />
        </Section>

        {/* 🌍 APP PREFERENCES */}
        <Section title="Preferences">
          <SettingRow
            onPress={() => setModalVisible(true)}
            icon={<Globe size={20} color={theme === 'dark' ? '#94a3b8' : '#6b7280'} />}
            label="Appearance"
            subValue={theme}
          />
          <SettingRow label="Language" subValue="English" />
        </Section>

        {/* 📄 LEGAL */}
        <Section title="Support">
          <SettingRow label="Help Center" />
          <SettingRow label="Privacy Policy" />
          <SettingRow label="About Fixr" subValue="v1.0.4" />
        </Section>

        {/* 🚪 LOGOUT */}
        <View className="px-6 mt-8">
          <Pressable 
            onPress={() => logout(false)} 
            className="bg-red-50 dark:bg-red-900/20 py-4 rounded-2xl items-center active:opacity-60 border border-red-100 dark:border-red-900/40"
          >
            <Text className="text-red-600 dark:text-red-400 font-bold text-base">
              Log Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Theme Selection Modal */}
      <ThemeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}