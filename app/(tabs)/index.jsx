import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Project Components
import LocationLoader from "../../src/components/card.loader.location";
import TechnicianCarousel from "../../src/components/carousel.technician";
import SearchHeader from "../../src/components/header.search";
import TechnicianListing from "../../src/components/list.technicians";
import FilterModal from "../../src/components/modal.filter";
import LocationModal from "../../src/components/modal.location";

// Logic & Data
import { calculateDistance } from "../../src/utils/functions";
import { technicians } from "../../src/utils/utils";

export default function Homepage() {
  const insets = useSafeAreaInsets();
  
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [displayAddress, setDisplayAddress] = useState("Locating...");
  const [selectedCity, setSelectedCity] = useState(null); // null = Coordinate mode
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  
  const [filters, setFilters] = useState({ 
    exp: 0, 
    rating: 0, 
    verified: false, 
    availability: false, 
    gender: 'all', 
    skills: [], 
    fees: 5000 
  });

  // --- 1. INITIALIZATION: Location & Permissions ---
  useEffect(() => {
    (async () => {
      let { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      
      // Default fallback (Balrampur center)
      let coords = { latitude: 27.4099, longitude: 82.1851 };

      if (status !== "granted") {
        if (!canAskAgain) {
          Alert.alert(
            "Location Required",
            "Please enable location in settings to see nearby experts.",
            [{ text: "Settings", onPress: () => Linking.openSettings() }]
          );
        }
        setDisplayAddress("Balrampur (Default)");
      } else {
        try {
          const loc = await Location.getCurrentPositionAsync({ 
            accuracy: Location.Accuracy.Balanced,
          });
          coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
          setUserLocation(coords);

          let reverse = await Location.reverseGeocodeAsync(coords);
          if (reverse.length > 0) {
            const addr = reverse[0];
            // Format: "Building/Street, City"
            const fullAddress = `${addr.name || ''} ${addr.street || ''}, ${addr.city || addr.subregion || ''}`.trim();
            setDisplayAddress(fullAddress || "Current Location");
          }
        } catch (e) {
          setDisplayAddress("Balrampur (Default)");
        }
      }
      setLoadingLocation(false);
    })();
  }, []);

  const activeLocation = userLocation ?? { latitude: 27.4099, longitude: 82.1851 };

  // --- 2. BASE LIST: Distance or City Logic ---
  const locationBasedTechs = useMemo(() => {
    return (technicians || [])
      .map(tech => {
        const dist = calculateDistance(
          activeLocation.latitude, activeLocation.longitude,
          tech?.location?.coordinates?.latitude, tech?.location?.coordinates?.longitude
        );
        return { ...tech, distance: parseFloat(dist.toFixed(1)) };
      })
      .filter(t => {
        // Switch: If user manually picked a city, use city string. Else use 20km radius.
        if (selectedCity) {
          return t.location.city?.toLowerCase() === selectedCity?.toLowerCase();
        }
        return t.distance <= 20; 
      })
      .sort((a, b) => a.distance - b.distance);
  }, [activeLocation, selectedCity]);

  // --- 3. FILTERING: Applying search, skills, and criteria ---
  const processedTechs = useMemo(() => {
    // return locationBasedTechs
    return locationBasedTechs.filter(t => {
      // Search logic (Name, Profession, or specific Skill name)
      const matchesSearch = !searchQuery || 
        t.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        t.profession?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        t.skills?.some(s => (s.name || s)?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesVerified = !filters.verified || t.is_verified === true;
      const matchesAvailability = !filters.availability || t.availability?.is_available_now === true;
      const matchesExp = filters.exp === "Any" || t.experience_years >= filters.exp;
      const matchesRating = t.rating >= filters.rating;
      const matchesFees = t.starting_price <= filters.fees;
      const matchesGender = filters.gender === 'all' || t.gender?.toLowerCase() === filters.gender;
      
      // Multi-skill filter: check if tech has ANY of the selected filter skills
      const matchesSkills = filters.skills.length === 0 || 
        t.skills?.some(s => filters.skills.includes(s.name || s));

      return matchesSearch 
            && matchesVerified 
            && matchesAvailability 
            && matchesExp 
            && matchesRating 
            && matchesFees 
            && matchesGender 
            && matchesSkills;
    });
  }, [locationBasedTechs, searchQuery, filters]);

  // --- 4. CATEGORIZATION: For Carousels & Remaining List ---
  const { carousels, remainingTechs } = useMemo(() => {
    // Only available pros get featured in carousels
    const available = processedTechs.filter(t => t.availability?.is_available_now);
    
    // Get top 3 unique professions from available pool
    const roles = [...new Set(available.map(t => t.profession))].slice(0, 3);
    
    const displayedIds = new Set();
    const carData = roles.map(role => {
      const techsInRole = available.filter(t => t.profession === role);
      techsInRole.forEach(t => displayedIds.add(t.id));
      return { role, data: techsInRole };
    });

    return { 
      carousels: carData, 
      remainingTechs: processedTechs.filter(t => !displayedIds.has(t.id)) 
    };
  }, [processedTechs]);

  // --- RENDER ---
  if (loadingLocation) return <LocationLoader />;

  return (
    <View className="flex-1 bg-white dark:bg-black" >
      <SearchHeader 
        categoryList={carousels?.map((item) => item.role)}
        selectedCity={displayAddress}
        onSearch={setSearchQuery} 
        onFilterOpen={() => setIsFilterOpen(true)}
        onLocationOpen={() => setIsLocOpen(true)}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        className="flex-1 bg-gray-50 dark:bg-gray-950"
      >
        <View className="px-4 pt-4">
           <Text className="text-xl font-bold dark:text-white">
              {searchQuery ? `Results for "${searchQuery}"` : 
               selectedCity ? `Experts in ${selectedCity}` : "Within 20km of you"}
           </Text>
           {processedTechs.length === 0 && (
             <Text className="text-gray-500 mt-2">No professionals found matching these filters.</Text>
           )}
        </View>

        {searchQuery ? (
          <View className="py-4">
            <TechnicianListing technicians={processedTechs} />
          </View>
        ) : (
          <View className="pb-10">
            {carousels.map((item, index) => (
              <TechnicianCarousel key={index} title={item.role} technicians={item.data} />
            ))}
            
            <TechnicianListing 
              technicians={remainingTechs} 
              title={remainingTechs.length > 0 ? `Other Experts Near You (${remainingTechs.length})` : ""} 
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
            setSelectedCity(cityData);
            setDisplayAddress(cityData);
          } else {
            // "Use Current Location" returns reverseGeocode array
            const addr = cityData[0];
            const full = `${addr.name || ''} ${addr.street || ''}, ${addr.city || ''}`.trim();
            setSelectedCity(null); 
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