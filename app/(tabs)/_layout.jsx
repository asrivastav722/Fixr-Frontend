import * as Haptics from 'expo-haptics';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { Home, Search, Settings, User } from 'lucide-react-native';
import { useEffect } from 'react';
import { Platform, Pressable, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const inset = useSafeAreaInsets();  

  useEffect(() => {
      NavigationBar?.setButtonStyleAsync("light"); 
    }, []);

  return (<View className='flex-1 bg-black' paddingTop={inset.top} paddingBottom={inset.bottom} >
    <StatusBar barStyle="light-content" />
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Removes labels
        tabBarActiveTintColor: '#000000', // Blue-950
        tabBarInactiveTintColor: '#9ca3af', // Gray-400
        tabBarStyle: {
          backgroundColor: 'white',
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
              fill={focused ? '#000000' : 'transparent'} // "Flooded" effect
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
              strokeWidth={focused ? 3 : 2} // Subtle extra "pop" for search
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
              fill={focused ? '#000000' : 'transparent'} 
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
              fill={focused ? '#000000' : 'transparent'} 
            />
          ),
        }}
      />
    </Tabs>
    </View>
  );
}