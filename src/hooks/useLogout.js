import { useTheme } from "@/context/ThemeContext";
import { logout } from "@/store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert, DevSettings, Platform } from "react-native";
import { useDispatch } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {changeTheme}=useTheme()

  const performLogout = async (isReset) => {
    try {
      if (isReset) {
        // Nuclear option: Wipes EVERYTHING
        dispatch(logout());
        await AsyncStorage.clear()
        // Handle Reload based on Platform
        if (Platform.OS === "web") {
          window.location.reload();
        } else {
          DevSettings.reload();
        }
      } else {
        // Standard option: Only wipes the user session
        await AsyncStorage.removeItem("USER_SESSION");
        dispatch(logout());
        changeTheme("light")
        
        // Navigate back to entry
        // We use replace to ensure they can't "back" into the profile
        router?.replace("/(tabs)/user");
      }
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const log_Out = (isReset = false) => {
    const title = isReset ? "Reset App" : "Logout";
    const message = isReset 
      ? "This will wipe all data and restart the app." 
      : "Are you sure you want to log out?";

    // Web-specific confirmation (Optional, Alert.alert DOES work on web, 
    // but window.confirm is more native to browsers)
    if (Platform.OS === "web") {
      const confirmed = window.confirm(`${title}\n\n${message}`);
      if (confirmed) performLogout(isReset);
      return;
    }

    // Native Mobile Alert
    Alert.alert(title, message, [
      { text: "Cancel", style: "cancel" },
      {
        text: isReset ? "Reset Now" : "Logout",
        style: "destructive",
        onPress: () => performLogout(isReset),
      },
    ]);
  };

  return { logout: log_Out };
};