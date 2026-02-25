import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // colorScheme here is the ACTUAL active theme (light or dark)
  const { colorScheme, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState("system"); // This is the SETTING (system, light, dark)

  // 1. Load the saved setting on mount
  useEffect(() => {
    const initTheme = async () => {
      const saved = await AsyncStorage.getItem("APP_THEME");
      if (saved) {
        setTheme(saved);
        applyTheme(saved);
      } else {
        applyTheme("system");
      }
    };
    initTheme();
  }, []);

  // 2. The Logic to apply themes correctly
  const applyTheme = (mode) => {
    if (mode === "system") {
      const systemTheme = Appearance.getColorScheme() || "light";
      setColorScheme(systemTheme);
    } else {
      setColorScheme(mode);
    }
  };

  // 3. Listen for System changes
  useEffect(() => {
      if (theme === "system") {
        const systemTheme = Appearance.getColorScheme() 
        setColorScheme(systemTheme);
      }
      else{
        setColorScheme(theme)
      }
    }, [theme]);

  const changeTheme = async (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    await AsyncStorage.setItem("APP_THEME", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme,           // The setting ('system' | 'light' | 'dark')
      activeScheme: colorScheme, // The actual rendering mode ('light' | 'dark')
      changeTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);