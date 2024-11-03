import { StatusBar, View } from 'react-native'
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { Home } from '@/screens/Home'
import { Loading } from '@/components/Loading'
import { Header } from '@/components/Header'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <View className="bg-gray-600 flex-1">
      <Home />
      <Header />
      <StatusBar barStyle={'light-content'} />
    </View>
  )
}
