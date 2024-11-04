import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import logoImage from '@/assets/logo.png'
import { colors } from '@/styles/colors'

type HeaderProps = {
  task: string
  inputRef: React.RefObject<TextInput>
  onChangeText: (task: string) => void
  onPress: () => void
}

export function Header({ task, onChangeText, onPress, inputRef }: HeaderProps) {
  return (
    <View className="bg-gray-700 items-center justify-center w-full h-60 relative">
      <Image source={logoImage} alt="Logo" />
      <View className="h-14 w-full flex-row items-center justify-center absolute -bottom-7">
        <TextInput
          className="h-14 w-3/4 bg-gray-500 rounded-md p-4 font-regular border border-gray-700 mr-1 text-gray-100 focus:border-purple"
          placeholder="Adicione uma nova tarefa"
          placeholderTextColor={colors.gray[300]}
          value={task}
          onChangeText={onChangeText}
          ref={inputRef}
          autoCorrect={false}
          onSubmitEditing={onPress}
          returnKeyType="done"
        />
        <TouchableOpacity
          className="h-14 w-14 rounded-md bg-blue_dark hover:bg-blue items-center justify-center"
          activeOpacity={0.7}
          onPress={onPress}
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
