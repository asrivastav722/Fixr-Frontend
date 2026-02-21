import { ArrowRight } from "lucide-react-native"
import { FlatList, Pressable, Text, View } from "react-native"
import { technicians } from "../utils/utils"
import TechnicianCard from "./card.technician"

const TechnicianCarousel = ({ title = "Hello" }) => {


  const filteredTechs = technicians?.filter(tech => tech?.role?.toLowerCase().includes(title?.toLowerCase()));

  return (
    <View>
      {/* Title with consistent padding */}
      <View className="flex-row justify-between items-center w-full p-3">
        <Text className="text-lg font-semibold">
          {`${title}s ${filteredTechs.length > 0 ? `(${filteredTechs.length})` : ''}`}
        </Text>
        
        <Pressable className="p-2 active:opacity-50">
          <ArrowRight size={20} color="#111827" />
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={filteredTechs}
        keyExtractor={(item) => item?.id.toString()}
        // Use this for the internal spacing of the list
        contentContainerClassName="px-3 gap-2" 
        showsHorizontalScrollIndicator={false}
        // snapToInterval adjusts for card width + gap for a "premium" feel
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item }) => (
          // Set a fixed width or percentage so cards don't collapse
          <View className="w-[280px]">
            <TechnicianCard type={title} technician={item} />
          </View>
        )}
      />
    </View>
  )
}
export default TechnicianCarousel