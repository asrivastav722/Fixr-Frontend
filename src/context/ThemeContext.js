import React, { createContext, useContext, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSettings } from "@/store/authSlice"; // Adjust path

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const dispatch = useDispatch();
  
  // Select the theme from the Redux user object
  const theme = useSelector((state) => state.auth.user?.theme || "light");

  // Sync NativeWind whenever the Redux theme changes (on load or after update)
  useEffect(() => {
    if (theme !== colorScheme) {
      setColorScheme(theme);
    }
  }, [theme, colorScheme]);

  const changeTheme = async (newTheme) => {
    if (newTheme === theme) return;

    // We use the 'type/value' pattern we discussed for the backend
    // This triggers the API call and updates Redux automatically upon success
    try {
      await dispatch(updateUserSettings({ 
        type: "theme", 
        value: newTheme 
      })).unwrap(); 
      
      // .unwrap() allows us to catch errors specifically from the thunk if needed
    } catch (error) {
      console.error("Theme sync failed:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);