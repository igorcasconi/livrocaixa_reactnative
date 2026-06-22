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
import { SafeAreaView } from 'react-native-safe-area-context'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './src/context/AuthContext'
import Routes from './src/core/navigation/Routes'
import { RealmProvider } from './src/context/RealmContext'

import './src/core/config/StatusBarConfig'

const App: React.FC = () => {
  console.log('App component rendered')
  return (
    <RealmProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <AuthProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </AuthProvider>
        </ApplicationProvider>
      </SafeAreaView>
    </RealmProvider>
  )
}

export default App
