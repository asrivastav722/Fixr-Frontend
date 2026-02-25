import { Check, ChevronRight } from "lucide-react-native";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

const FilterModal = ({ visible, onClose, filters, setFilters }) => {
  
  // Dynamic skills mapping based on selected category
  const categorySkills = {
    electrician: ["Wiring", "Circuit Repair", "Lighting", "Generator"],
    plumber: ["Pipe Leak", "Drainage", "Fitting", "Water Heater"],
    mechanic: ["Engine", "Brakes", "Suspension", "Oil Change"],
    all: ["Repair", "Installation", "Maintenance", "Emergency"]
  };

  const activeSkills = filters.profession !== 'all' 
    ? categorySkills[filters?.profession?.toLowerCase()] || categorySkills?.all 
    : categorySkills?.all;

  const toggleSkill = (skill) => {
    const currentSkills = filters?.skills || [];
    setFilters({
      ...filters,
      skills: currentSkills?.includes(skill)
        ? currentSkills.filter(s => s !== skill)
        : [...currentSkills, skill]
    });
  };

  return (
    <Modal animationType="slide" visible={visible} transparent onRequestClose={onClose} statusBarTranslucent>
      <Pressable onPress={onClose} className="flex-1 justify-end bg-black/50">
        <Pressable onPress={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[92%]">
          
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <Text className="text-xl font-bold dark:text-white">Refine Search</Text>
            <Pressable onPress={() => { 
              setFilters({ exp: 0, rating: 0, verified: false, availability: false, gender: 'all', skills: [], fees: 5000, profession: 'all' }); 
              onClose(); 
            }}>
              <Text className="text-red-500 font-medium">Clear All</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="py-2">
            
            {/* 1. Category Selection */}
            <FilterSection title="Profession">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
                {['all', 'Electrician', 'Plumber', 'Mechanic']?.map(cat => (
                  <SelectableChip 
                    key={cat} label={cat?.charAt(0)?.toUpperCase() + cat?.slice(1)} 
                    active={filters?.profession?.toLowerCase() === cat?.toLowerCase()} 
                    onPress={() => setFilters({...filters, profession: cat?.toLowerCase(), skills: []})} 
                  />
                ))}
              </ScrollView>
            </FilterSection>

            {/* 2. Base Fees (High Range Selection) */}
            <FilterSection title={`Max Budget: ₹${filters.fees}`}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
                {[500, 1000, 5000, 10000, 25000, 50000].map(v => (
                  <Pressable 
                    key={v} onPress={() => setFilters({...filters, fees: v})}
                    className={`mr-3 items-center justify-center w-20 h-12 rounded-xl border ${filters.fees === v ? 'bg-black border-black' : 'border-gray-200 dark:border-gray-700'}`}
                  >
                    <Text className={`text-xs ${filters.fees === v ? 'text-white font-bold' : 'text-gray-500'}`}>₹{v > 999 ? `${v/1000}k` : v}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </FilterSection>

            {/* 3. Experience (Level Selector) */}
            <FilterSection title={`Experience Level: ${filters.exp}+ Years`}>
               <View className="px-6 flex-row items-center justify-between bg-gray-50 dark:bg-gray-800 mx-6 py-4 rounded-2xl">
                 {[0, 5, 10, 15, 20].map(val => (
                   <Pressable key={val} onPress={() => setFilters({...filters, exp: val})} className="items-center">
                      <View className={`w-3 h-3 rounded-full mb-2 ${filters.exp >= val ? 'bg-black dark:bg-white' : 'bg-gray-300'}`} />
                      <Text className="text-[10px] dark:text-gray-400">{val}y</Text>
                   </Pressable>
                 ))}
               </View>
            </FilterSection>

            {/* 4. Status (The "Vibe" check) */}
            <FilterSection title="Professional Status">
              <View className="px-6 flex-row gap-3">
                <SelectableChip label="Verified Only" active={filters.verified} onPress={() => setFilters({...filters, verified: !filters.verified})} />
                <SelectableChip label="Online" active={filters.availability} onPress={() => setFilters({...filters, availability: !filters.availability})} />
              </View>
            </FilterSection>

            {/* 5. Context-Based Skills */}
            <FilterSection title={`Specialized in ${filters.profession !== 'all' ? filters.profession : 'Services'}`}>
              <View className="px-6 flex-row flex-wrap">
                {activeSkills.map(s => (
                  <Pressable 
                    key={s} onPress={() => toggleSkill(s)}
                    className={`mb-2 mr-2 px-4 py-2 rounded-lg border-b-2 ${filters.skills?.includes(s) ? 'bg-blue-50 border-blue-500' : 'bg-white dark:bg-gray-800 border-transparent'}`}
                  >
                    <Text className={`text-sm ${filters.skills?.includes(s) ? 'text-blue-600 font-bold' : 'text-gray-600 dark:text-gray-300'}`}>{s}</Text>
                  </Pressable>
                ))}
              </View>
            </FilterSection>

            <View className="h-10" /> 
          </ScrollView>

          {/* Footer Action */}
          <View className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Pressable onPress={onClose} className="bg-black py-4 rounded-2xl flex-row justify-center items-center shadow-lg active:opacity-90">
              <Text className="text-white font-bold text-lg mr-2">Apply Filters</Text>
              <ChevronRight color="white" size={20} />
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

// Internal Helper Components
const FilterSection = ({ title, children }) => (
  <View className="mb-6">
    <Text className="text-gray-400 mb-3 uppercase text-[10px] tracking-widest font-bold px-6">{title}</Text>
    {children}
  </View>
);

const SelectableChip = ({ label, active, onPress }) => (
  <Pressable 
    onPress={onPress} 
    className={`px-5 py-2.5 mr-3 rounded-2xl border flex-row items-center ${active ? 'bg-black border-black' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}
  >
    {active && <View className="mr-2"><Check size={14} color="white" strokeWidth={3} /></View>}
    <Text className={`text-sm ${active ? 'text-white font-bold' : 'text-gray-600 dark:text-gray-400'}`}>{label}</Text>
  </Pressable>
);

export default FilterModal;