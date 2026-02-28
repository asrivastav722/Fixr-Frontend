import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export const useCurrentLocation = (props = {}) => {
  const { 
    fallbackCoords = { latitude: 27.4099, longitude: 82.1851 },
    fallbackName = "Balrampur (Default)",
    useAddress = true 
  } = props;

  const [location, setLocation] = useState(null);
  const [displayAddress, setDisplayAddress] = useState("Loading...");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    try {
      let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (!canAskAgain) {
          Alert.alert(
            "Location Required",
            "Please enable location in settings to see nearby experts.",
            [{ text: "Settings", onPress: () => Linking.openSettings() }]
          );
        }
        setLocation(fallbackCoords);
        setDisplayAddress(fallbackName);
        setErrorMsg("Permission denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      setLocation(coords);

      if (useAddress) {
        let reverse = await Location.reverseGeocodeAsync(coords);
        if (reverse.length > 0) {
          const addr = reverse[0];
          const fullAddress = `${addr.name || ''} ${addr.street || ''}, ${addr.city || addr.subregion || ''}`.replace(/\s+/g, ' ').trim();
          setDisplayAddress(fullAddress || "Current Location");
        }
      }
    } catch (e) {
      setErrorMsg(e.message);
      setLocation(fallbackCoords);
      setDisplayAddress(fallbackName);
    } finally {
      setLoading(false);
    }
  }, [fallbackCoords, fallbackName, useAddress]);

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, displayAddress, loading, errorMsg, refresh: fetchLocation };
};