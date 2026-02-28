import * as Haptics from "expo-haptics";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';

import LocationLoader from "@/components/card.loader.location";
import TechnicianCarousel from "@/components/carousel.technician";
import SearchHeader from "@/components/header.search";
import TechnicianListing from "@/components/list.technicians";
import FilterModal from "@/components/modal.filter";
import LocationModal from "@/components/modal.location";

import { calculateDistance } from "@/utils/functions";
import { technicians } from "@/utils/utils";
import { useTheme } from "@/context/ThemeContext";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useGeocoding } from "@/hooks/useGeocoding";

export default function Homepage() {
  const { activeScheme } = useTheme();
  const { getCoordsFromCity } = useGeocoding();

  const { 
    location: hookLocation, 
    displayAddress: hookAddress, 
    loading: loadingLocation, 
    refresh 
  } = useCurrentLocation({ fallbackName: "Balrampur center" });

  const [searchQuery, setSearchQuery] = useState("");
  const [displayAddress, setDisplayAddress] = useState("Locating...");
  const [selectedCity, setSelectedCity] = useState(null); 
  const [manualCoords, setManualCoords] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  
  const [filters, setFilters] = useState({ 
    exp: 0, rating: 0, verified: false, availability: false, gender: 'all', skills: [], fees: 5000 
  });

  useEffect(() => {
    if (!loadingLocation && hookAddress && !selectedCity) {
      setDisplayAddress(hookAddress);
    }
  }, [loadingLocation, hookAddress, selectedCity]);

  useEffect(() => { 
    NavigationBar?.setButtonStyleAsync(activeScheme === "dark" ? "light" : "dark");
  }, [activeScheme]);

  // Use manualCoords if user picked a city, otherwise use GPS hookLocation
  const activeLocation = manualCoords ?? hookLocation ?? { latitude: 27.4099, longitude: 82.1851 };

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
        if (selectedCity) return t.location.city?.toLowerCase() === selectedCity?.toLowerCase();
        return t.distance <= 20; 
      })
      .sort((a, b) => a.distance - b.distance);
  }, [activeLocation, selectedCity]);

  const processedTechs = useMemo(() => {
    return locationBasedTechs.filter(t => {
      const matchesSearch = !searchQuery || 
        t.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        t.profession?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        t.skills?.some(s => (s.name || s)?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
      
      const matchesVerified = !filters.verified || t.is_verified === true;
      const matchesAvailability = !filters.availability || t.availability?.is_available_now === true;
      const matchesExp = filters.exp === 0 || t.experience_years >= filters.exp;
      const matchesRating = t.rating >= filters.rating;
      const matchesFees = t.starting_price <= filters.fees;
      const matchesGender = filters.gender === 'all' || t.gender?.toLowerCase() === filters.gender;
      const matchesSkills = filters.skills.length === 0 || t.skills?.some(s => filters.skills.includes(s.name || s));

      return matchesSearch && matchesVerified && matchesAvailability && matchesExp && matchesRating && matchesFees && matchesGender && matchesSkills;
    });
  }, [locationBasedTechs, searchQuery, filters]);

  const { carousels, remainingTechs } = useMemo(() => {
    const available = processedTechs.filter(t => t.availability?.is_available_now);
    const roles = [...new Set(available.map(t => t.profession))].slice(0, 3);
    const displayedIds = new Set();
    const carData = roles.map(role => {
      const techsInRole = available.filter(t => t.profession === role);
      techsInRole.forEach(t => displayedIds.add(t.id));
      return { role, data: techsInRole };
    });
    return { carousels: carData, remainingTechs: processedTechs.filter(t => !displayedIds.has(t.id)) };
  }, [processedTechs]);

  if (loadingLocation && !hookLocation) return <LocationLoader />;

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <SearchHeader 
        categoryList={carousels?.map((item) => item.role)}
        selectedCity={displayAddress}
        onSearch={setSearchQuery} 
        onFilterOpen={() => setIsFilterOpen(true)}
        onLocationOpen={() => setIsLocOpen(true)}
      />

      <ScrollView 
        className="flex-1 bg-gray-50 dark:bg-gray-950"
        refreshControl={<RefreshControl refreshing={loadingLocation} onRefresh={() => { setSelectedCity(null); setManualCoords(null); refresh(); }} />}
      >
        <View className="px-4 pt-4">
           <Text className="text-xl font-bold dark:text-white">
              {searchQuery ? `Results for "${searchQuery}"` : selectedCity ? `Experts in ${selectedCity}` : "Within 20km of you"}
           </Text>
        </View>

        {searchQuery ? (
          <View className="py-4"><TechnicianListing technicians={processedTechs} /></View>
        ) : (
          <View className="pb-10">
            {carousels.map((item, index) => <TechnicianCarousel key={index} title={item.role} technicians={item.data} />)}
            {remainingTechs.length > 0 && <TechnicianListing technicians={remainingTechs} title="Other Experts Near You" />}
          </View>
        )}
      </ScrollView>

      <LocationModal 
        visible={isLocOpen} 
        onClose={() => setIsLocOpen(false)} 
        onSelect={async (data) => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          if (data.type === "city") {
            const coords = await getCoordsFromCity(data.name);
            setSelectedCity(data.name);
            setDisplayAddress(data.name);
            setManualCoords(coords);
          } else {
            setSelectedCity(null);
            setManualCoords(null);
            refresh();
          }
        }} 
      />

      <FilterModal visible={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </View>
  );
}