import { Trash } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { Task } from "../types/types";
import { formatRelativeTime } from "../utils/date";
import { EditTaskModal } from "./EditTaskModal";

type ScrollTaskProps = {
  tasks: Task[];
  toggleTask: (id: Task["id"]) => void;
  deleteTask: (id: Task["id"]) => void;
  editTask: (id: Task["id"], newTitle: string) => void; // 👈 новое
};

export function ScrollTask({
  tasks,
  toggleTask,
  deleteTask,
  editTask,
}: ScrollTaskProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const editingTask = tasks.find((t) => t.id === editingTaskId);
  return (
    <>
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

              <TouchableOpacity
                onLongPress={() => setEditingTaskId(task.id)}
                activeOpacity={0.7}
                className="flex-1"
                delayLongPress={400} // задержка 400мс перед срабатыванием
              >
                <Text
                  className={`text-base pe-5 ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-800"
                  }`}
                  numberOfLines={1}
                >
                  {task.title}
                </Text>
              </TouchableOpacity>

              {!task.completed &&
                (() => {
                  // Если категория есть в словаре, берем её, иначе берем 'personal' как запасной вариант
                  const cat = CATEGORIES[task.category] || CATEGORIES.personal;

                  return (
                    <View className={`px-2 py-1 rounded ${cat.bgColor}`}>
                      <Text className={`text-xs font-medium ${cat.color}`}>
                        {cat.emoji}
                      </Text>
                    </View>
                  );
                })()}

              <View className="items-end mx-4">
                <Text className="text-xs text-gray-400">
                  {formatRelativeTime(task.createdAt)}
                </Text>
              </View>

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

      <EditTaskModal
        visible={editingTaskId !== null}
        title={editingTask?.title || ""}
        onClose={() => setEditingTaskId(null)}
        onSave={(newTitle) => {
          if (editingTaskId) {
            editTask(editingTaskId, newTitle);
          }
        }}
      />
    </>
  );
}
