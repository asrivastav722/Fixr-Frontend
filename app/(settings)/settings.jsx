import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  View,
  Platform,
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
  User,
  Bell,
  Tool,
  ShieldCheck,
  CircleHelp
} from "lucide-react-native";
import { useSelector } from "react-redux";

// Custom Hooks & Context
import { useTheme } from "@/context/ThemeContext";
import { useLogout } from "@/hooks/useLogout";
import ThemeModal from "@/components/modal.theme";

export default function SettingsPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const { logout } = useLogout();

  const user = useSelector((state) => state.auth.user);
  const roles = user?.roles || ['customer'];
  const isTechnician = roles.includes("technician");

  const [settings, setSettings] = useState({
    pushNotifications: true,
    jobAlerts: true,
    autoAccept: false,
    availability: true,
  });

  const toggle = (key) =>
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  // --- Amazon-style Section Wrapper ---
  const Section = ({ title, children }) => (
    <View className="mb-6">
      <Text className="px-6 mb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[2px]">
        {title}
      </Text>
      <View className="bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-800">
        {children}
      </View>
    </View>
  );

  // --- Professional Row Component ---
  const SettingRow = ({ icon, label, right, onPress, subValue, isLast, isDestructive }) => (
    <Pressable 
      onPress={onPress} 
      className={`flex-row justify-between items-center py-4 ml-6 pr-6 ${!isLast ? 'border-b border-zinc-50 dark:border-zinc-800' : ''} active:opacity-60`}
    >
      <View className="flex-row items-center flex-1">
        {icon && <View className="mr-4">{icon}</View>}
        <Text className={`text-base font-inter font-medium ${isDestructive ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'}`}>
          {label}
        </Text>
      </View>
      <View className="flex-row items-center">
        {subValue && (
          <Text className="text-sm font-roboto text-zinc-400 dark:text-zinc-500 mr-2 capitalize">
            {subValue}
          </Text>
        )}
        {right || <ChevronRight size={18} color={isDark ? "#3f3f46" : "#d4d4d8"} />}
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-white dark:bg-zinc-950">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <View 
              style={{ paddingTop: Platform.OS === 'ios' ? inset.top : inset.top + 10 }}
              className="flex-row bg-white dark:bg-zinc-950 items-center p-3 border-b border-zinc-100 dark:border-zinc-900"
            >
              <Pressable
                onPress={() => router.back()}
                className="p-2 mr-2  rounded-full active:scale-90"
              >
                <ChevronLeft size={24} color={isDark ? '#fff' : '#000'} />
              </Pressable>
              <Text className="font-poppins font-bold text-xl text-zinc-900 dark:text-zinc-50">
                Settings
              </Text>
            </View>
          ),
        }}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: inset.bottom + 40, paddingTop: 20 }}
        className='bg-zinc-100 dark:bg-zinc-900'
      >
        {/* 👤 ACCOUNT */}
        <Section title="Profile & Security">
          <SettingRow
            onPress={() => router.push("/edit-profile")}
            icon={<User size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
            label="Personal Information"
          />
          <SettingRow
            icon={<Lock size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
            label="Login & Security"
          />
          <SettingRow
            icon={<Trash2 size={20} color="#ef4444" />}
            label="Close Account"
            isDestructive
            isLast
          />
        </Section>

        {/* 🔔 NOTIFICATIONS */}
        <Section title="Alert Preferences">
          <SettingRow
            icon={<Bell size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
            label="Push Notifications"
            right={
              <Switch
                value={settings.pushNotifications}
                onValueChange={() => toggle("pushNotifications")}
                trackColor={{ false: "#d4d4d8", true: "#3b82f6" }}
                thumbColor={Platform.OS === 'android' ? '#fff' : ''}
              />
            }
          />
          <SettingRow
            label="Service Reminders"
            isLast
            right={
              <Switch
                value={settings.jobAlerts}
                onValueChange={() => toggle("jobAlerts")}
                trackColor={{ false: "#d4d4d8", true: "#3b82f6" }}
                thumbColor={Platform.OS === 'android' ? '#fff' : ''}
              />
            }
          />
        </Section>

        {/* 🛠 TECHNICIAN TOOLS */}
        {isTechnician && (
          <Section title="Pro Mode Dashboard">
            <SettingRow
              icon={<ShieldCheck size={20} color="#10b981" />}
              label="Availability Status"
              right={
                <Switch
                  value={settings.availability}
                  onValueChange={() => toggle("availability")}
                  trackColor={{ false: "#d4d4d8", true: "#10b981" }}
                />
              }
            />
            <SettingRow
              icon={<Tool size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
              label="Auto-Accept Requests"
              right={
                <Switch
                  value={settings.autoAccept}
                  onValueChange={() => toggle("autoAccept")}
                  trackColor={{ false: "#d4d4d8", true: "#3b82f6" }}
                />
              }
            />
            <SettingRow label="Service Radius" subValue="25 km" isLast />
          </Section>
        )}

        {/* 💳 PAYMENTS */}
        <Section title="Finances">
          <SettingRow
            icon={<CreditCard size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
            label="Payment Methods"
          />
          <SettingRow
            icon={<CreditCard size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
            label="Transaction History"
            isLast
          />
        </Section>

        {/* 🌍 APP PREFERENCES */}
        <Section title="System">
          <SettingRow
            onPress={() => setModalVisible(true)}
            icon={<Globe size={20} color={isDark ? '#a1a1aa' : '#71717a'} />}
            label="Appearance"
            subValue={theme}
          />
          <SettingRow label="Language" subValue="English" isLast />
        </Section>

        {/* 📄 LEGAL */}
        <Section title="Help & Legal">
          <SettingRow icon={<CircleHelp size={20} color="#71717a" />} label="Help Center" />
          <SettingRow label="Terms of Service" />
          <SettingRow label="About Fixr" subValue="v1.0.4" isLast />
        </Section>

        {/* 🚪 LOGOUT */}
        <View className="px-6 mt-4">
          <Pressable 
            onPress={() => logout(false)} 
            className="bg-white dark:bg-zinc-900 py-4 rounded-2xl items-center active:scale-[0.98] border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            <Text className="text-red-500 dark:text-red-400 font-inter font-bold text-base uppercase tracking-widest">
              Sign Out
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