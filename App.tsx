/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

<<<<<<< HEAD
import React from 'react'
import codePush from 'react-native-code-push'
import { SafeAreaView } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthProvider } from './src/context/AuthContext'
import Routes from './src/navigation/Routes'
import { RealmProvider } from './src/context/RealmContext'

import './src/config/StatusBarConfig'

declare const global: { HermesInternal: null }
const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START }
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RealmProvider>
        <SafeAreaView />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </NavigationContainer>
        </ApplicationProvider>
      </RealmProvider>
    </QueryClientProvider>
  )
}

export default codePush(codePushOptions)(App)
=======
import React, { Fragment } from 'react'
import './src/config/StatusBarConfig'
import { SafeAreaView } from 'react-native'
import Routes from './src/navigation/Routes'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/context/AuthContext'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'

declare const global: { HermesInternal: null | {} }

const App = () => {
  return (
    <Fragment>
      <SafeAreaView></SafeAreaView>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </Fragment>
  )
}

export default App
>>>>>>> 000880b (fix(app): fixed app)
