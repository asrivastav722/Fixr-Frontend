import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import TechnicianCarousel from "../../src/components/carousel.technician";
import TechnicianInput from "../../src/components/input.technician";
import TechnicianListing from "../../src/components/list.technicians";
import { technicians } from "../../src/utils/utils";

export default function Homepage() {

  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 📍 Fetch Real User Location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission denied");
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setLoadingLocation(false);
    })();
  }, []);


  // 🔥 Haversine Distance Calculator
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = value => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (loadingLocation) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-4">Fetching your location...</Text>
      </View>
    );
  }

  // If permission denied fallback
  const activeLocation = userLocation ?? {
    latitude: 6.5244,   // fallback (example: Lagos)
    longitude: 3.3792,
  };
 

  // 🟢 Add Distance to Technicians
  const techniciansWithDistance = technicians?.map(tech => {
    const distance = calculateDistance(
      activeLocation.latitude,
      activeLocation.longitude,
      tech?.location?.coordinates?.latitude,
      tech?.location?.coordinates?.longitude
    );

    return {
      ...tech,
      distance: distance?.toFixed(1),
    };
  });

  // Sort nearest first
  const sortedTechs = techniciansWithDistance
    ?.filter(t => t?.availability?.is_available_now === true)
    ?.sort((a, b) => a.distance - b.distance);

  const techRoleList = sortedTechs?.reduce((acc, tech) => {
    if (acc.length < 3 && tech?.profession && !acc.includes(tech?.profession?.toLowerCase())) {
      acc.push(tech?.profession?.toLowerCase());
    }
    return acc;
  }, []);

  const displayedIds = [];

  const carousels = techRoleList?.map(role => {
    const techsInRole = sortedTechs?.filter(t => t?.profession?.toLowerCase() === role);
    techsInRole?.forEach(t => displayedIds.push(t?.id));
    return { role, data: techsInRole };
  });

  console.log("Displayed IDs:", carousels);

  const remainingTechs = sortedTechs?.filter(
    tech => !displayedIds?.includes(tech?.id)
  );

  const selectedCategoryTechs = selectedCategory
    ? sortedTechs?.filter(
        tech => tech?.profession?.toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

    console.log("Selected Category Techs:", selectedCategoryTechs);

  return ( <View className="flex-1 ">
      <View className="bg-black">
        <TechnicianInput />
        {/* <CategoryPicker setSelectCategory = {setSelectedCategory} selectedCategory={selectedCategory} categoryList={techRoleList} /> */}
      </View>

      <ScrollView className="bg-gray-100">
        <Text className="p-4 text-xl font-semibold">
          Professionals Near You
        </Text>

        {carousels?.map((item, index) => (
          <TechnicianCarousel
            key={index}
            title={`${item?.role}`}
            technicians={item?.data}
          />
        ))}

        <TechnicianListing
          technicians={remainingTechs}
          title={`Other Skilled Professionals (${remainingTechs?.length})`}
        />
      </ScrollView>
    </View>
  );
}