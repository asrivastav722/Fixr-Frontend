import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Globe,
  Lock,
  Settings,
  Trash2,
  User
} from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  View,
} from "react-native";
import { useTheme } from "../src/context/ThemeContext";
import ThemeModal from "./settings/modal.theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function SettingsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const { activeScheme ,theme} = useTheme();
  const inset =useSafeAreaInsets()
  // 🔥 Replace with global auth state
  const userRole = "both"; // customer | technician | both
  const isTechnician =
    userRole === "technician" || userRole === "both";

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    jobAlerts: true,
    messageAlerts: true,
    twoFactor: false,
    locationSharing: true,
    profileVisible: true,
    darkMode: false,
    autoAccept: false,
    availability: true,
  });

  const toggle = key =>
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));

  const Section = ({ title, children }) => (
    <View className="bg-white dark:bg-black  mt-4 px-6 py-5">
      <Text className="text-lg text-gray-900 dark:text-gray-200 font-bold mb-4">
        {title}
      </Text>
      {children}
    </View>
  );

  const SettingRow = ({ icon, label, right }) => (
    <View className="flex-row justify-between items-center py-3">
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-3 text-gray-700 dark:text-gray-300">
          {label}
        </Text>
      </View>
      {right}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900 " paddingTop={inset.top}>

      <View className="flex-row bg-white dark:bg-black items-center justify-start gap-3 w-full p-4" >
        {/* Settings Button */}
        <Pressable 
          onPress={() => router.back()}
          className=" rounded-full active:opacity-70"
        >
          <ChevronLeft size={30} color={activeScheme === 'dark' ? '#fff' : '#000'} />
        </Pressable>
        {/* Title */}
        <Text className="text-2xl font-bold text-gray-950 dark:text-gray-100">
          Settings
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 👤 ACCOUNT */}
        <Section title="Account">
          <SettingRow
            icon={<User size={18} color="#6b7280" />}
            label="Edit Profile"
          />
          <SettingRow
            icon={<Lock size={18} color="#6b7280" />}
            label="Change Password"
          />
          <SettingRow
            icon={<Trash2 size={18} color="#ef4444" />}
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
                onValueChange={() =>
                  toggle("pushNotifications")
                }
              />
            }
          />
          <SettingRow
            label="Email Notifications"
            right={
              <Switch
                value={settings.emailNotifications}
                onValueChange={() =>
                  toggle("emailNotifications")
                }
              />
            }
          />
          <SettingRow
            label="Job Alerts"
            right={
              <Switch
                value={settings.jobAlerts}
                onValueChange={() => toggle("jobAlerts")}
              />
            }
          />
          <SettingRow
            label="Message Alerts"
            right={
              <Switch
                value={settings.messageAlerts}
                onValueChange={() =>
                  toggle("messageAlerts")
                }
              />
            }
          />
        </Section>

        {/* 🔒 PRIVACY */}
        <Section title="Privacy & Security">
          <SettingRow
            label="Two-Factor Authentication"
            right={
              <Switch
                value={settings.twoFactor}
                onValueChange={() =>
                  toggle("twoFactor")
                }
              />
            }
          />
          <SettingRow
            label="Location Sharing"
            right={
              <Switch
                value={settings.locationSharing}
                onValueChange={() =>
                  toggle("locationSharing")
                }
              />
            }
          />
          <SettingRow
            label="Profile Visibility"
            right={
              <Switch
                value={settings.profileVisible}
                onValueChange={() =>
                  toggle("profileVisible")
                }
              />
            }
          />
        </Section>

        {/* 💳 PAYMENTS */}
        <Section title="Payments">
          <SettingRow
            icon={<CreditCard size={18} color="#6b7280" />}
            label="Saved Cards"
          />
          <SettingRow
            icon={<CreditCard size={18} color="#6b7280" />}
            label="Transaction History"
          />
          {isTechnician && (
            <SettingRow
              icon={<CreditCard size={18} color="#6b7280" />}
              label="Payout Method"
            />
          )}
        </Section>

        {/* 🛠 TECHNICIAN SETTINGS */}
        {isTechnician && (
          <Section title="Technician Settings">
            <SettingRow
              label="Availability"
              right={
                <Switch
                  value={settings.availability}
                  onValueChange={() =>
                    toggle("availability")
                  }
                />
              }
            />
            <SettingRow
              label="Auto Accept Jobs"
              right={
                <Switch
                  value={settings.autoAccept}
                  onValueChange={() =>
                    toggle("autoAccept")
                  }
                />
              }
            />
            <SettingRow label="Service Radius" />
            <SettingRow label="Pricing Preferences" />
          </Section>
        )}

        {/* 🌍 APP PREFERENCES */}
        <Section title="App Preferences">
          <SettingRow
            icon={<Globe size={18} color="#6b7280" />}
            label="Language"
          />
          
          <Pressable 
            onPress={() => setModalVisible(true)}
            className="flex-row items-center justify-between bg-white dark:bg-black p-4 rounded-2xl"
          >
            <Text className="text-gray-700 dark:text-gray-300 font-medium">Appearance</Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-gray-400 dark:text-gray-500 capitalize">{theme}</Text>
              <ChevronRight size={18} color="#9ca3af" />
            </View>
          </Pressable>

    


          <SettingRow label="Distance Unit (km/miles)" />
        </Section>

        {/* 📄 LEGAL */}
        <Section title="Legal & Support">
          <SettingRow label="Terms & Conditions" />
          <SettingRow label="Privacy Policy" />
          <SettingRow label="Help & Support" />
          <SettingRow label="About Fixr" />
        </Section>

        {/* 🚪 LOGOUT */}
        <View className="px-6 mt-6 mb-10">
          <Pressable className="bg-red-100 py-4 rounded-2xl items-center">
            <Text className="text-red-600 font-bold">
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <ThemeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
}