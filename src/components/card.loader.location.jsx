import { ActivityIndicator, Text, View } from "react-native";

const LocationLoader = () => {  
return <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator className="dark:text-white text-black" size="large" />
        <Text className="text-black dark:text-white mt-4">Fetching your location...</Text>
      </View>
}
export default LocationLoader;