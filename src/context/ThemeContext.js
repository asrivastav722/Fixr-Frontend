import React, { createContext, useContext, useEffect } from "react";
import { Platform } from "react-native";
import { useColorScheme } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSettings } from "@/store/authSlice";
import * as NavigationBar from 'expo-navigation-bar';
import { setStatusBarStyle } from 'expo-status-bar';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const dispatch = useDispatch();
  
  // Select theme from Redux
  const theme = useSelector((state) => state.auth.user?.theme || state.auth.theme || "light");

  useEffect(() => {
    const isDark = theme === "dark";

    // 1. Sync NativeWind
    if (theme !== colorScheme) {
      setColorScheme(theme);
    }

    // 2. Sync Status Bar (Top)
    setStatusBarStyle(isDark ? "light" : "dark");

    // 3. Sync Android Navigation Bar (Bottom)
    if (Platform.OS === 'android') {
      // Background: Slate-900 for dark, White for light
      NavigationBar.setBackgroundColorAsync(isDark ? '#0F172A' : '#FFFFFF');
      // Buttons: Light icons for dark bg, Dark icons for light bg
      NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    }
  }, [theme, colorScheme]);

  const changeTheme = async (newTheme) => {
    if (newTheme === theme) return;

    try {
      // Optimistic logic: update local state first if you want instant response, 
      // but dispatching the thunk is safer for data integrity.
      await dispatch(updateUserSettings({ 
        type: "theme", 
        value: newTheme 
      })).unwrap(); 
      
    } catch (error) {
      console.error("Fixr Theme Sync Error:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);