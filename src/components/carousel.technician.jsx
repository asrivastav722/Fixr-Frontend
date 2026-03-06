import { router } from "expo-router"
import { ArrowRight } from "lucide-react-native"
import { FlatList, Pressable, Text, View } from "react-native"
import TechnicianCard from "./card.technician"
import { useTheme } from "@/context/ThemeContext"

const TechnicianCarousel = ({ title = "Hello",technicians,key }) => {
  const {theme} = useTheme()
  const isDark = theme === 'dark'


  return (  technicians.length>0 && <View >
      {/* Title with consistent padding */}
      <View className="flex-row justify-between items-center w-full p-3 border border-transparent">
        <Text className="text-lg font-bold text-capitalize dark:text-zinc-200 text-zinc-950">
          {`${title.charAt(0).toUpperCase() + title.slice(1)}s ${technicians.length > 0 ? `(${technicians.length})` : ''}`}
        </Text>
        
        <Pressable className="p-2 active:opacity-50">
          <ArrowRight onPress={()=>{router?.push(`/role/${title}`)}} size={20} color={!isDark?'#09090b':'#fafafa'}  />
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