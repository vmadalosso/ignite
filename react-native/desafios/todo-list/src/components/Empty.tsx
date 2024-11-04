import { View, Image, Text } from 'react-native'

import clipboard from '@/assets/clipboard.png'

export function Empty() {
  return (
    <View className="flex-1 w-full items-center px-5 py-12 border-t-2 border-gray-400">
      <Image source={clipboard} alt="Clipboard" className="mb-4" />
      <Text className="font-bold text-gray-300 text-base">
        Você ainda não tem tarefas cadastradas
      </Text>
      <Text className="font-regular text-gray-300 text-base">
        Crie tarefas e organize seus itens a fazer
      </Text>
    </View>
  )
}
