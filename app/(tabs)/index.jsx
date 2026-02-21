import { ScrollView, StatusBar, Text, View } from "react-native";
import TechnicianCarousel from "../components/carousel.technician";
import TechnicianInput from "../components/input.technician";
import TechnicianListing from "../components/list.technicians";
import CategoryPicker from "../components/picker.technicians";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage() {
  return (<View className="flex-1">
        <View className="bg-blue-950">
          <TechnicianInput/>
          <CategoryPicker/>
        </View>
        <ScrollView>
          <Text className="p-3 text-xl font-semibold">Professionals Near You</Text>
          <TechnicianCarousel title="Mechanics"/>
          <TechnicianCarousel title="Plumbers"/>
          <TechnicianCarousel title="Cleaners"/>
          <TechnicianCarousel title="Electricians"/>
          <TechnicianCarousel title="IT Engineers"/>
          <TechnicianListing  title="Other Skilled Professionals"/>
        </ScrollView>
    </View>
  );
}



