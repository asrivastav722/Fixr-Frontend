import { hydrateAuth } from "@/store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const dispatch = useDispatch();
  
  // 1. Local state to track preference
  const [themeSetting, setThemeSetting] = useState("light");

  // 2. Listen to Redux for Hydrated Theme
  const reduxTheme = useSelector((state) => state.auth.theme);

  useEffect(() => {
    // Only switch if reduxTheme is strictly 'light' or 'dark'
    if (reduxTheme === "light" || reduxTheme === "dark") {
      setThemeSetting(reduxTheme);
      setColorScheme(reduxTheme);
    }
  }, [reduxTheme]);

  // 3. Simplified Change Theme function
  const changeTheme = async (val) => {
    // Only accept light or dark
    if (val !== "light" && val !== "dark") return;

    setThemeSetting(val);
    setColorScheme(val);

    // Persist to Disk
    try {
      await AsyncStorage.setItem("APP_THEME", val);
    } catch (e) {
      console.error("Failed to save theme to storage", e);
    }
    
    // Sync with Redux Store
    dispatch(hydrateAuth({ theme: val }));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: themeSetting,        // The saved preference ('light' | 'dark')
      activeScheme: colorScheme,  // What NativeWind is currently rendering
      changeTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);