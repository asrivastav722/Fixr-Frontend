import { checkApiHealth } from "@/store/apiSlice";
import { useEffect } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function MyProfilePage() {
  const dispatch = useDispatch();
  
  // Select API state from Redux
  const { status, message,isReady } = useSelector((state) => state.api);

  useEffect(() => {
    // Only fetch if we haven't succeeded yet
    if (isReady && status === 'idle') {
      dispatch(checkApiHealth());
    }
  }, [status]);

  // ... rest of your profile logic ...

  return (
    <View className="flex-1 bg-gray-50 dark:bg-black">
      {/* Small connection indicator at the bottom */}
      <View className="absolute bottom-20 w-full items-center">
        <Text className={`text-[10px] ${status === 'failed' ? 'text-red-500' : 'text-green-500'}`}>
          API: {status === 'loading' ? 'Connecting...' : message}
        </Text>
      </View>
      
      {/* Your existing profile JSX */}
    </View>
  );
}