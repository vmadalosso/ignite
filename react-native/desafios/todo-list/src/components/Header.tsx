import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import logoImage from '@/assets/logo.png'
import { colors } from '@/styles/colors'

export function Header() {
  return (
    <View className="bg-gray-700 items-center justify-center w-full h-60 relative">
      <Image source={logoImage} />
      <View className="h-14 w-full flex-row items-center justify-center absolute -bottom-7">
        <TextInput
          className="h-14 w-3/4 bg-gray-500 rounded-md p-4 font-regular border-2 border-gray-700 mr-1"
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={colors.gray[300]}
        />
        <TouchableOpacity
          className="h-14 w-14 rounded-md bg-blue_dark items-center justify-center"
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={22}
            color={colors.gray[100]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
