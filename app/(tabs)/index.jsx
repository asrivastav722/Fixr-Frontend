import { ScrollView, StatusBar, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TechnicianCarousel from "../../src/components/carousel.technician";
import TechnicianInput from "../../src/components/input.technician";
import TechnicianListing from "../../src/components/list.technicians";
import CategoryPicker from "../../src/components/picker.technicians";
import { technicians } from "../../src/utils/utils";

export default function Homepage() {

  const insets = useSafeAreaInsets();
  // 1. Get the top 3 roles
  const techRoleList = technicians?.reduce((acc, tech) => {
    if (acc.length < 3 && tech?.role && !acc.includes(tech?.role)) {
      acc?.push(tech?.role);
    }
    return acc;
  }, []);

  // 2. Identify EXACTLY which technicians are going into carousels
  // We create an array of IDs that are already "used"
  const displayedIds = [];
  
  const carousels = techRoleList?.map(role => {
    const techsInThisRole = technicians?.filter(t => t?.role === role);
    // Add these specific technician IDs to our "used" list
    techsInThisRole?.forEach(t => displayedIds?.push(t?.id));
    
    return { role, data: techsInThisRole };
  });

  // 3. Filter the bottom list by ID, not by Role
  const remainingTechs = technicians.filter(tech => !displayedIds?.includes(tech?.id));

  return (
    <View className="flex-1" backgroundColor="#172554" style={{ paddingTop: insets.top }}>
      <StatusBar backgroundColor="#172554" barStyle='light-content' translucent={false} />

        <View >
          <TechnicianInput/>
          <CategoryPicker/>
        </View>
        <ScrollView className="bg-gray-100">
          <Text className="p-3 text-xl font-semibold">Professionals Near You</Text>
          
          {carousels?.map((item,index) => (
            <TechnicianCarousel key={index} title={item?.role} data={item?.data}/>
          ))}

          {/* Now 'remaining' only contains people NOT seen above */}
          <TechnicianListing 
            technicians={remainingTechs} 
            title={`Other Skilled Professionals (${remainingTechs?.length})`}
          />
        </ScrollView>
    </View>
  );
}