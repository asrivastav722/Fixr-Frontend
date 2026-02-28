import * as Location from "expo-location";

export const useGeocoding = () => {
  const getCoordsFromCity = async (cityName) => {
    try {
      const results = await Location.geocodeAsync(cityName);
      if (results.length > 0) {
        return {
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        };
      }
      return null;
    } catch (e) {
      console.error("Geocoding error:", e);
      return null;
    }
  };

  return { getCoordsFromCity };
};