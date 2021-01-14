/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
