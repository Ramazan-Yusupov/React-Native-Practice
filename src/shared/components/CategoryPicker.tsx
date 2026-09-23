import { Text, TouchableOpacity, View } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { Category } from "../types/types";

type CategoryPickerProps = {
  selected: Category;
  onSelect: (category: Category) => void;
};

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <View className="flex-row gap-2 mb-4 flex-wrap">
      {(Object.keys(CATEGORIES) as Category[]).map((key) => {
        const cat = CATEGORIES[key];
        const isActive = selected === key;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(key)}
            className={`px-3 py-2 rounded-lg border-2 ${
              isActive
                ? `${cat.bgColor} border-current`
                : "bg-white border-gray-200"
            }`}
            activeOpacity={0.7}
          >
            <Text className={`text-sm font-medium ${cat.color}`}>
              {cat.emoji} {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
