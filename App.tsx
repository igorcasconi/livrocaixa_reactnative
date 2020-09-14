/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import './src/config/StatusBarConfig';
import { SafeAreaView } from 'react-native';
import { AuthProvider } from './src/navigation/AuthProvider';
import Routes from './src/navigation/Routes';
import { NavigationContainer } from '@react-navigation/native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return(
  <>
  <SafeAreaView></SafeAreaView>
  <NavigationContainer>
    <AuthProvider>
        <Routes />
    </AuthProvider>
  </NavigationContainer>
  </> );
  
};


export default App;
