import { FlatList, Text, View } from "react-native"
import TechnicianCard from "./card.technician"


const TechnicianList = ({title="",technicians})=>{
return technicians?.length > 0 && <View className="flex-1 ">
        {title && <Text className="text-lg p-3 font-semibold text-black dark:text-white">{title}</Text>}
        <FlatList
          data={technicians}
          keyExtractor={(item) => item?.id}
          renderItem={({ item,index }) => (
            <View key={index} className="px-3 py-1 w-full">
              <TechnicianCard technician={item} />
            </View>
          )}
        />
      </View>
}
export default TechnicianList