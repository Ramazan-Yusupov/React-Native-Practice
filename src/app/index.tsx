import { CategoryPicker } from "@/shared/components/CategoryPicker";
import { ScrollTask } from "@/shared/components/ScrollTask";
import { useTasks } from "@/shared/hooks/useTasks";
import { Category } from "@/shared/types/types";
import { PlusCircle, Trash2 } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const {
    tasks,
    isLoading,
    addTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    editTask,
  } = useTasks();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("personal");

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
    addTask(inputValue.trim(), selectedCategory);
    setInputValue("");
  };

  const completedTask = tasks.filter((t) => t.completed).length;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-200">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-600">Загрузка задач...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-200"
    >
      <View className="flex-1 p-6 pt-12">
        <Text className="text-3xl font-bold text-gray-800 mb-6">
          Мои Задачи
        </Text>

        <View className="flex-row gap-3 mb-6">
          <TextInput
            className="flex-1 h-12 px-4 bg-white border border-gray-300 rounded-xl text-gray-800 text-base"
            placeholder="Что нужно сделать"
            placeholderTextColor="#9CA3AF"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAddTask}
          />
          <TouchableOpacity
            onPress={handleAddTask}
            disabled={inputValue.length === 0}
            className="h-12 w-12 bg-blue-600 rounded-xl items-center justify-center active:bg-blue-700 disabled:opacity-50"
          >
            <PlusCircle color="white" size={24} />
          </TouchableOpacity>
        </View>

        <CategoryPicker
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 font-medium">
            Выполнено: {completedTask} из {tasks.length}
          </Text>
          {completedTask > 0 && (
            <TouchableOpacity
              onPress={clearCompleted}
              className="flex-row items-center gap-1 px-3 py-1 bg-red-100 rounded-lg active:bg-red-200"
            >
              <Trash2 color="#DC2626" size={14} />
              <Text className="text-red-600 text-sm font-medium">Очистить</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollTask
          tasks={tasks}
          editTask={editTask}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
