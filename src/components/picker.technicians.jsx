import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { CATEGORIES } from "../utils/utils";

export default function CategoryPicker({
  setSelectCategory,
  selectedCategory,
  categoryList = CATEGORIES
}) {
  console.log("Selected Category in Picker:", categoryList);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View className="py-2">
      <FlatList
        horizontal
        data={CATEGORIES?.filter((cat) => categoryList?.includes(cat?.name?.toLowerCase()))?.map((cat) => ({
          ...cat,
          name: cat?.name?.toLowerCase() // Ensure names are lowercase for consistency
        }))}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-4"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const Icon = item?.icon;
          const isSelected = selectedId === item?.id;

          return (
            <Pressable 
              onPress={() => {
                setSelectedId(item?.id);
                setSelectCategory(item?.name);
              }}
              className="items-center"
            >
              {/* Icon Circle */}
              <View className={`w-16 h-16 rounded-2xl items-center justify-center mb-2 ${item.color} ${isSelected && 'border-2 border-white'}`}>
                <Icon size={28} color={item.iconColor} />
              </View>
              
              {/* Category Name */}
              <Text className={`text-[11px] font-medium ${isSelected ? 'text-gray-100 font-bold' : 'text-gray-400'}`}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}