import { Trash } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type ScrollTaskProps = {
  tasks: Task[];
  toggleTask: (id: Task["id"]) => void;
  deleteTask: (id: Task["id"]) => void;
};

export function ScrollTask({ tasks, toggleTask, deleteTask }: ScrollTaskProps) {
  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-3 pb-6"
    >
      {tasks.length === 0 ? (
        <View className="items-center justify-center mt-10 opacity-50">
          <Text className="text-gray-500 text-lg">Задач пока нет 🎉</Text>
        </View>
      ) : (
        tasks.map((task) => (
          <View
            key={task.id}
            className="flex-row items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
          >
            <TouchableOpacity
              onPress={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                task.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300"
              }`}
            >
              {task.completed && (
                <Text className="text-white text-xs font-bold">✓</Text>
              )}
            </TouchableOpacity>

            <Text
              className={`flex-1 text-base ${
                task.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
              numberOfLines={2}
            >
              {task.title}
            </Text>

            <TouchableOpacity
              onPress={() => deleteTask(task.id)}
              className="w-8 h-8 bg-red-100 rounded-lg items-center justify-center active:bg-red-200"
            >
              <Trash color="#DC2626" size={18} />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}
