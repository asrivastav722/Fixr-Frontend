import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance, AppState } from "react-native";
import { useSelector } from "react-redux";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  
  // 1. Start with 'light' as requested. 
  // Redux will eventually tell us if there's a saved preference.
  const [themeSetting, setThemeSetting] = useState("light");

  // 2. Listen to Redux Hydration
  // When RootLayout finishes the AsyncStorage.multiGet, this will trigger.
  const reduxTheme = useSelector((state) => state.auth.theme);

  useEffect(() => {
    if (reduxTheme) {
      setThemeSetting(reduxTheme);
      if (reduxTheme === "system") {
        setColorScheme(Appearance.getColorScheme());
      } else {
        setColorScheme(reduxTheme);
      }
    }
  }, [reduxTheme]);

  // 3. Logic for System/OS Sync
  useEffect(() => {
    const syncWithOS = () => {
      if (themeSetting === "system") {
        const osValue = Appearance.getColorScheme();
        setColorScheme(osValue); 
      }
    };

    syncWithOS();

    const sub = Appearance.addChangeListener(({ colorScheme: newOSScheme }) => {
      if (themeSetting === "system") {
        setColorScheme(newOSScheme);
      }
    });

    const stateSub = AppState.addEventListener("change", (state) => {
      if (state === "active") syncWithOS();
    });

    return () => {
      sub.remove();
      stateSub.remove();
    };
  }, [themeSetting]);

  // 4. Enhanced changeTheme function
  const changeTheme = async (val) => {
    setThemeSetting(val);
    
    // Save to Disk (AsyncStorage)
    try {
      await AsyncStorage.setItem("APP_THEME", val);
    } catch (e) {
      console.error("Failed to save theme to storage", e);
    }
    
    // Update NativeWind
    if (val === "system") {
      setColorScheme(Appearance.getColorScheme());
    } else {
      setColorScheme(val);
    }
    
    // Note: If you want Redux to also stay in sync when the user 
    // changes theme in Settings, you could dispatch an action here.
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: themeSetting, 
      activeScheme: colorScheme, 
      changeTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);