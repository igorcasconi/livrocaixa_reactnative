/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { AuthProvider } from './src/context/AuthContext'
import Routes from './src/core/navigation/Routes'
import { RealmProvider } from './src/context/RealmContext'
import { ThemeProvider } from 'styled-components/native'
import theme from './src/core/theme'
import mobileAds, { AppOpenAd, MaxAdContentRating, TestIds } from 'react-native-google-mobile-ads'

const App: React.FC = () => {
  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,
        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,
        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR']
      })
      .then(() =>
        mobileAds()
          .initialize()
          .then(adapterStatuses => {
            // Initialization complete!
            console.log(adapterStatuses)
          })
      )
  }, [])

  return (
    <GestureHandlerRootView>
      <RealmProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' translucent={false} hidden={false} />
            <ApplicationProvider {...eva} theme={eva.light}>
              <AuthProvider>
                <NavigationContainer>
                  <Routes />
                </NavigationContainer>
              </AuthProvider>
            </ApplicationProvider>
          </SafeAreaView>
        </ThemeProvider>
      </RealmProvider>
    </GestureHandlerRootView>
  )
}

export default App
