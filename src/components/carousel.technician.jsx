import { router } from "expo-router"
import { ArrowRight } from "lucide-react-native"
import { FlatList, Pressable, Text, View } from "react-native"
import TechnicianCard from "./card.technician"

const TechnicianCarousel = ({ title = "Hello",technicians,key }) => {



  return (  technicians.length>0 && <View >
      {/* Title with consistent padding */}
      <View className="flex-row justify-between items-center w-full p-3">
        <Text className="text-lg font-semibold text-capitalize dark:text-gray-200 text-gray-800">
          {`${title.charAt(0).toUpperCase() + title.slice(1)}s ${technicians.length > 0 ? `(${technicians.length})` : ''}`}
        </Text>
        
        <Pressable className="p-2 active:opacity-50">
          <ArrowRight onPress={()=>{router?.push(`/role/${title}`)}} size={20} color="#6b7280"  />
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={technicians}
        keyExtractor={(item) => item?.id.toString()}
        // Use this for the internal spacing of the list
        contentContainerClassName="px-3 gap-2" 
        showsHorizontalScrollIndicator={false}
        // snapToInterval adjusts for card width + gap for a "premium" feel
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item }) => {
          return (
          // Set a fixed width or percentage so cards don't collapse
          <View className="w-[280px]">
            <TechnicianCard type={title} technician={item} />
          </View>
        )}}
      />
    </View>
  )
}
export default TechnicianCarousel