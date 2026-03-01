import { useTheme } from '@/context/ThemeContext';
import * as Haptics from 'expo-haptics';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { Calendar, Home, MessageSquare, User } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const inset = useSafeAreaInsets();
  const {theme}=useTheme()
  
  useEffect(() => { 
    NavigationBar?.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (<View className='flex-1 bg-white dark:bg-black' paddingTop={inset.top} paddingBottom={inset.bottom} >
    <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} className='bg-white dark:bg-black' />
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme === "dark" ? "#F3F4F6" : "#030712", 
        tabBarInactiveTintColor: theme === "dark" ? "#9ca3af" : "#9CA3AF", 
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff",  
          borderTopWidth: 0,
          height:  Platform.select({ ios: 55, android: 50 }),
          paddingBottom: Platform.OS === 'ios' ? 15 : 5,
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          elevation: 0, 
          shadowColor: '#000', 
        },
        // Adds Haptic Feedback on every tab press
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={(e) => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              props.onPress?.(e);
            }}
          />
        ),
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({color}) => <Home color={color} /> }} />
      <Tabs.Screen name="bookings" options={{ title: "Bookings", tabBarIcon: ({color}) => <Calendar color={color} /> }} />
      <Tabs.Screen name="chat" options={{ title: "Messages", tabBarIcon: ({color}) => <MessageSquare color={color} /> }} />
      <Tabs.Screen name="user" options={{ title: "Profile", tabBarIcon: ({color}) => <User color={color} /> }} />

      
    </Tabs>
    </View>
  );
}