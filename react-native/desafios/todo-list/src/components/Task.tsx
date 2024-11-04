import { TouchableOpacity, View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { clsx } from 'clsx'

import { colors } from '@/styles/colors'
import { TaskDTO } from '@/utils/TaskDTO'

type TaskProps = TaskDTO & {
  onTaskDone: (id: string) => void
  onTaskDelete: (id: string) => void
}

export function Task({
  id,
  title,
  isCompleted,
  onTaskDone,
  onTaskDelete,
}: TaskProps) {
  return (
    <View className="w-full h-16 bg-gray-500 flex-row items-center justify-between my-1 px-3 py-5 rounded-lg border-2 border-gray-400">
      <TouchableOpacity onPress={() => onTaskDone(id)}>
        <MaterialCommunityIcons
          name={
            isCompleted
              ? 'checkbox-marked-circle-outline'
              : 'checkbox-blank-circle-outline'
          }
          size={18}
          color={isCompleted ? colors.purple : colors.blue}
        />
      </TouchableOpacity>

      <View className="w-4/5 h-10 mx-2 justify-center">
        <Text
          className={clsx('text-lg text-gray-100', {
            'text-lg text-gray-300 line-through': isCompleted,
          })}
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onTaskDelete(id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={18}
          color={colors.gray[300]}
        />
      </TouchableOpacity>
    </View>
  )
}
