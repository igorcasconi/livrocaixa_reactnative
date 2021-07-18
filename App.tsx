/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import codePush from 'react-native-code-push'
import { SafeAreaView } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthProvider } from './src/context/AuthContext'
import Routes from './src/navigation/Routes'

import './src/config/StatusBarConfig'

declare const global: { HermesInternal: null }
const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START }
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 200000,
      refetchOnWindowFocus: false
    }
  }
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView></SafeAreaView>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}

export default codePush(codePushOptions)(App)
