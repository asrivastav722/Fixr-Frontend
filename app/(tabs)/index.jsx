import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { MapPin, MapPinned, Search, SlidersHorizontal, Target } from "lucide-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Imports from your project
import LocationLoader from "../../src/components/card.loader.location";
import TechnicianCarousel from "../../src/components/carousel.technician";
import TechnicianListing from "../../src/components/list.technicians";
import { calculateDistance } from "../../src/utils/functions";
import { technicians } from "../../src/utils/utils";

const INDIAN_CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow"];

// --- SUB-COMPONENTS ---

const SearchHeader = ({ onSearch, onFilterOpen, onLocationOpen, selectedCity }) => (
  <View className="bg-white dark:bg-black px-4 pb-4 pt-2 shadow-sm">
    <View className="flex-row justify-between items-center mb-4">
      <View>
        <Text className="text-3xl font-bold text-blue-950 dark:text-white">Fixr</Text>
        <Pressable onPress={onLocationOpen} className="flex-row items-center mt-1">
          <MapPin size={14} color="#3b82f6" />
          <Text className="text-gray-500 dark:text-gray-400 text-xs ml-1 font-medium">
            {selectedCity}
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={onFilterOpen} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
        <SlidersHorizontal size={20} color="#6b7280" />
      </Pressable>
    </View>
    <View className="flex-row items-center bg-gray-100 dark:bg-gray-900 rounded-2xl px-4 py-3">
      <Search size={20} color="#9ca3af" />
      <TextInput 
        placeholder="Search name, skill, or role..." 
        className="flex-1 ml-3 text-gray-800 dark:text-white"
        placeholderTextColor="#9ca3af"
        onChangeText={onSearch}
      />
    </View>
  </View>
);

const LocationModal = ({ visible, onClose, onSelect }) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleGetCurrentLocation = async () => {
    try {
      setIsLocating(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return alert("Permission denied");

      let location = await Location.getCurrentPositionAsync({});
      let reverse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverse.length > 0) {

        onSelect(reverse);
        onClose();
      }
    } catch (e) { alert("Error fetching location"); } 
    finally { setIsLocating(false); }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 bg-black/60 justify-center p-6">
        <View className="bg-white dark:bg-gray-900 rounded-3xl p-4 max-h-[70%]">
          <Text className="text-lg font-bold mb-2 dark:text-white p-2">Select Location</Text>
          <Pressable onPress={handleGetCurrentLocation} className="flex-row items-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl mb-2">
            <Target size={18} color="#3b82f6" />
            <Text className="ml-3 font-bold text-blue-600">{isLocating ? "Locating..." : "Use Current Location"}</Text>
          </Pressable>
          <FlatList 
            data={INDIAN_CITIES}
            renderItem={({item}) => (
              <Pressable onPress={() => { onSelect(item); onClose(); }} className="flex-row items-center p-4 border-b border-gray-100 dark:border-gray-800">
                <MapPinned size={18} color="#9ca3af" /><Text className="ml-3 dark:text-gray-200">{item}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

// --- MAIN COMPONENT ---

// ... keep your imports ...

export default function Homepage() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [displayAddress, setDisplayAddress] = useState("Locating...");
  const [selectedCity, setSelectedCity] = useState(null); // null means "use coordinates"
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [filters, setFilters] = useState({ exp: 0, rating: 0 });
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  // 1. Load Real Location & Address on Mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      // Fallback coordinates (Balrampur)
      let coords = { latitude: 25.444352, longitude: 81.7463296 };

      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
        setUserLocation(coords);

        // Fetch Full Address
        let reverse = await Location.reverseGeocodeAsync(coords);
        if (reverse.length > 0) {
          const addr = reverse[0];
          const fullAddress = `${addr.name || ''} ${addr.street || ''}, ${addr.city || addr.subregion || ''}`.trim();
          setDisplayAddress(fullAddress || "Current Location");
        }
      } else {
        setDisplayAddress("Balrampur (Default)");
      }
      setLoadingLocation(false);
    })();
  }, []);

  const activeLocation = userLocation ?? { latitude: 25.444352, longitude: 81.7463296 };
  console.log(activeLocation)

  // 2. The "Real List" - Distance-based (20km) OR City-based
  const locationBasedTechs = useMemo(() => {
    return technicians?.map(tech => {
      const dist = calculateDistance(
        activeLocation.latitude, activeLocation.longitude,
        tech?.location?.coordinates?.latitude, tech?.location?.coordinates?.longitude
      );
      return { ...tech, distance: dist.toFixed(1) };
    })
    .filter(t => {
      // If a manual city is picked, filter by city. 
      // Otherwise, filter by 20km radius from coordinates.
      if (selectedCity) {
        return t.location.city?.toLowerCase() === selectedCity.toLowerCase();
      }
      return parseFloat(t.distance) <= 20; // 20km range
    })
    .sort((a, b) => a.distance - b.distance);
  }, [activeLocation, selectedCity]);

  // 3. Search & Filter applied on the "Real List"
  const processedTechs = useMemo(() => {
    return locationBasedTechs.filter(t => {
      const matchesSearch = !searchQuery || 
        t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.profession?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.skills?.some(s => s.name?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesExp = t.experience_years >= filters.exp;
      const matchesRating = t.rating >= filters.rating;
      
      return matchesSearch && matchesExp && matchesRating;
    });
  }, [locationBasedTechs, searchQuery, filters]);

  // 4. Content Categorization (using processed list)
  const { carousels, remainingTechs } = useMemo(() => {
    const available = processedTechs.filter(t => t.availability?.is_available_now);
    const roles = [...new Set(available.map(t => t.profession?.toLowerCase()))].slice(0, 3);
    
    const displayedIds = [];
    const carData = roles.map(role => {
      const techs = available.filter(t => t.profession?.toLowerCase() === role);
      techs.forEach(t => displayedIds.push(t.id));
      return { role, data: techs };
    });

    return { 
      carousels: carData, 
      remainingTechs: available.filter(t => !displayedIds.includes(t.id)) 
    };
  }, [processedTechs]);

  if (loadingLocation) return <LocationLoader />;

  return (
    <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: insets.top }}>
      <SearchHeader 
        selectedCity={displayAddress}
        onSearch={setSearchQuery} 
        onFilterOpen={() => setIsFilterOpen(true)}
        onLocationOpen={() => setIsLocOpen(true)}
      />

      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950">
        {searchQuery ? (
          <View className="p-4">
            <Text className="text-xl font-bold dark:text-white mb-4">Results for "{searchQuery}"</Text>
            <TechnicianListing technicians={processedTechs} />
          </View>
        ) : (
          <View className="pb-10">
            <Text className="p-4 text-xl font-bold dark:text-white">
              {selectedCity ? `Experts in ${selectedCity}` : "Within 20km of you"}
            </Text>
            
            {carousels.map((item, index) => (
              <TechnicianCarousel key={index} title={item.role} technicians={item.data} />
            ))}
            
            <TechnicianListing 
              technicians={remainingTechs} 
              title={`Other Experts Near You (${remainingTechs.length})`} 
            />
          </View>
        )}
      </ScrollView>

      {/* --- MODALS --- */}
      <LocationModal 
        visible={isLocOpen} 
        onClose={() => setIsLocOpen(false)} 
        onSelect={(cityData) => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          if (typeof cityData === 'string') {
            // Manual City Selection
            setSelectedCity(cityData);
            setDisplayAddress(cityData);
          } else {
            // "Current Location" selected (returns reverse array)
            const addr = cityData[0];
            const full = `${addr.name || ''} ${addr.street || ''}, ${addr.city || ''}`.trim();
            setSelectedCity(null); // Reset to coordinate mode
            setDisplayAddress(full || "Current Location");
          }
        }} 
      />

      <FilterModal 
        visible={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        filters={filters} 
        setFilters={setFilters} 
      />
    </View>
  );
}

// --- HELPERS ---
const FilterModal = ({ visible, onClose, filters, setFilters }) => (
  <Modal animationType="slide" transparent visible={visible}>
    <View className="flex-1 justify-end bg-black/50">
      <View className="bg-white dark:bg-gray-900 p-6 rounded-t-3xl min-h-[40%]">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold dark:text-white">Filters</Text>
          <Pressable onPress={() => {setFilters({exp: 0, rating: 0});onClose()}}><Text className="text-blue-500">Reset</Text></Pressable>
        </View>
        <Text className="text-gray-400 mb-2 uppercase text-xs font-bold">Experience</Text>
        <View className="flex-row gap-2 mb-6">
          {[0, 2, 5, 10].map(v => (
            <Pressable key={v} onPress={() => setFilters({...filters, exp: v})} className={`px-4 py-2 rounded-full border ${filters.exp === v ? 'bg-blue-950 border-blue-950' : 'border-gray-200 dark:border-gray-700'}`}>
              <Text className={filters.exp === v ? 'text-white' : 'dark:text-white'}>{v}+ yrs</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={onClose} className="bg-blue-950 py-4 rounded-2xl items-center"><Text className="text-white font-bold">Apply</Text></Pressable>
      </View>
    </View>
  </Modal>
);