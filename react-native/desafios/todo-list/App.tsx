import { StatusBar } from 'react-native'
import {
  useFonts,
  // eslint-disable-next-line camelcase
  Inter_400Regular,
  // eslint-disable-next-line camelcase
  Inter_700Bold,
} from '@expo-google-fonts/inter'

import { Home } from '@/screens/Home'
import { Loading } from '@/components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Inter_400Regular,
    // eslint-disable-next-line camelcase
    Inter_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <Home />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      />
    </>
  )
}
