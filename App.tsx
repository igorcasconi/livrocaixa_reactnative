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
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AuthProvider } from './src/context/AuthContext'
import Routes from './src/core/navigation/Routes'
import { RealmProvider } from './src/context/RealmContext'

const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <RealmProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle='default'
            backgroundColor='#4db476' // Android only
            translucent={false} // Android only
            hidden={true}
          />
          <ApplicationProvider {...eva} theme={eva.light}>
            <AuthProvider>
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </AuthProvider>
          </ApplicationProvider>
        </SafeAreaView>
      </RealmProvider>
    </GestureHandlerRootView>
  )
}

export default App
