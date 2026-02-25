import * as Haptics from 'expo-haptics';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { Home, Search, Settings, User } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';

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
        tabBarShowLabel: false, // Removes labels
        tabBarActiveTintColor: theme === "dark" ? "#F3F4F6" : "#030712", // Blue-950
        tabBarInactiveTintColor: theme === "dark" ? "#9ca3af" : "#9CA3AF", // Gray-400
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#ffffff", // Matches the app background  
          borderTopWidth: 0,
          // Using Platform.select ensures it looks "regular" on both systems
          height:  Platform.select({ ios: 55, android: 50 }),
          paddingBottom: Platform.OS === 'ios' ? 15 : 5,
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          
          // Sleek Shadow
          elevation: 0, // Android
          shadowColor: '#000', // iOS
          
          // Floating look (optional: uncomment for a more modern vibe)
          // marginHorizontal: 20,
          // marginBottom: 20,
          // borderRadius: 25,
          // position: 'absolute', 
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
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Search 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <User 
              size={24} 
              color={color} 
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Settings 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}