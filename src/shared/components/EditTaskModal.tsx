import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

type EditTaskModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  onSave: (newTitle: string) => void;
};

export function EditTaskModal({
  visible,
  title,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onSave(editedTitle.trim());
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center p-6">
        <View className="w-full bg-white rounded-2xl p-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Редактировать задачу
          </Text>

          <TextInput
            className="h-12 px-4 bg-gray-100 rounded-xl text-gray-800 text-base mb-4"
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
            onSubmitEditing={handleSave}
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 h-12 bg-gray-200 rounded-xl items-center justify-center active:bg-gray-300"
            >
              <Text className="text-gray-700 font-semibold">Отмена</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={!editedTitle.trim()}
              className="flex-1 h-12 bg-blue-600 rounded-xl items-center justify-center active:bg-blue-700 disabled:opacity-50"
            >
              <Text className="text-white font-semibold">Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
