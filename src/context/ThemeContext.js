import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind"; // Import this!

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState("system"); // Default to system

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    // 1. Determine what the actual mode should be
    const targetTheme = theme === "system" 
      ? Appearance.getColorScheme() || "light" 
      : theme;

    // 2. Tell NativeWind to switch
    setColorScheme(targetTheme);

    // 3. Listen for system changes if 'system' is selected
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === "system") {
        setColorScheme(colorScheme || "light");
      }
    });

    return () => listener.remove();
  }, [theme]);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem("APP_THEME");
    if (saved) setTheme(saved);
  };

  const changeTheme = async (newTheme) => {
    setTheme(newTheme);
    await AsyncStorage.setItem("APP_THEME", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);