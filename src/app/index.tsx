import { ScrollTask } from "@/components/ScrollTask";
import { PlusCircle } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: inputValue,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: string | number) => {
    setTasks(
      tasks.map((task) =>
        task.id === String(id) ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const completedTask = tasks.filter((t) => t.completed).length;

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
            onSubmitEditing={addTask}
          />
          <TouchableOpacity
            onPress={addTask}
            disabled={inputValue.length === 0}
            className="h-12 w-12 bg-blue-600 rounded-xl items-center justify-center active:bg-blue-700 disabled:bg-blue-400"
          >
            <PlusCircle color="white" />
          </TouchableOpacity>
        </View>
        <Text className="pb-6">
          Выполнено: {completedTask} из {tasks.length}
        </Text>

        <ScrollTask
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
