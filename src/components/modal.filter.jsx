import { Check } from "lucide-react-native";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

const FilterModal = ({ visible, onClose, filters, setFilters }) => {
  
  const toggleSkill = (skill) => {
    const currentSkills = filters.skills || [];
    if (currentSkills.includes(skill)) {
      setFilters({ ...filters, skills: currentSkills.filter(s => s !== skill) });
    } else {
      setFilters({ ...filters, skills: [...currentSkills, skill] });
    }
  };

  return (
    <Modal animationType="slide" visible={visible} transparent onRequestClose={onClose} statusBarTranslucent>
      <Pressable onPress={onClose} className="flex-1 justify-end bg-black/50">
        <Pressable onPress={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-900 rounded-t-3xl max-h-[90%]">
          
          {/* Header */}
          <View className="flex-row justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
            <Text className="text-xl font-bold dark:text-white">Filters</Text>
            <Pressable onPress={() => { setFilters({ exp: 0, rating: 0, verified: false, availability: false, gender: 'all', skills: [], fees: 5000 }); onClose(); }}>
              <Text className="text-blue-500 font-medium">Reset All</Text>
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="py-3">
            {/* 1. Quick Status */}
            <FilterSection title="Status">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3 px-6">
                <SelectableChip 
                  label="Verified Only" 
                  active={filters.verified} 
                  onPress={() => setFilters({...filters, verified: !filters.verified})} 
                />
                <SelectableChip 
                  label="Available Now" 
                  active={filters.availability} 
                  onPress={() => setFilters({...filters, availability: !filters.availability})} 
                />
              </ScrollView>
            </FilterSection>

            {/* 2. Base Fees (Slider-like behavior) */}
            <FilterSection title={`Max Base Fees: ₹${filters.fees || 5000}`}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row flex-wrap gap-2 px-6">
                {[500, 1000, 2000, 5000].map(v => (
                  <SelectableChip 
                    key={v} label={`Up to ₹${v}`} 
                    active={filters.fees === v} 
                    onPress={() => setFilters({...filters, fees: v})} 
                  />
                ))}
              </ScrollView>
            </FilterSection>

            {/* 3. Experience */}
            <FilterSection title="Experience">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 px-6">
                {[0, 2, 5, 10].map(v => (
                  <SelectableChip 
                    key={v} label={v === 0 ? "Any" : `${v}+ yrs`} 
                    active={filters.exp === v} 
                    onPress={() => setFilters({...filters, exp: v})} 
                  />
                ))}
              </ScrollView>
            </FilterSection>

            {/* 4. Gender */}
            <FilterSection title="Technician Gender">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 px-6">
                {['all', 'male', 'female'].map(g => (
                  <SelectableChip 
                    key={g} label={g.charAt(0).toUpperCase() + g.slice(1)} 
                    active={filters.gender === g} 
                    onPress={() => setFilters({...filters, gender: g})} 
                  />
                ))}
              </ScrollView>
            </FilterSection>

            {/* 5. Popular Skills (Multi-select) */}
            <FilterSection title="Special Skills">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row flex-wrap gap-2 px-6">
                {['Repair', 'Installation', 'Maintenance', 'Emergency'].map(s => (
                  <SelectableChip 
                    key={s} label={s} 
                    active={filters.skills?.includes(s)} 
                    onPress={() => toggleSkill(s)} 
                  />
                ))}
              </ScrollView>
            </FilterSection>
            
            <View className="h-10" /> 
          </ScrollView>

          {/* Footer Action */}
          <View className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Pressable onPress={onClose} className="bg-black py-4 rounded-2xl items-center shadow-lg">
              <Text className="text-white font-bold text-lg">Apply Filters</Text>
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
    <Text className="text-gray-400 mb-3 uppercase text-[10px] tracking-widest font-bold px-6 py-1">{title}</Text>
    {children}
  </View>
);

const SelectableChip = ({ label, active, onPress }) => (
  <Pressable 
    onPress={onPress} 
    className={`px-4 py-2 mr-3 rounded-xl border flex-row items-center ${active ? 'bg-black border-black' : 'border-gray-200 dark:border-gray-700'}`}
  >
    {active && <View className="mr-2"><Check size={14} color="white" /></View>}
    <Text className={active ? 'text-white font-bold' : 'text-gray-600 dark:text-gray-400'}>{label}</Text>
  </Pressable>
);

export default FilterModal;