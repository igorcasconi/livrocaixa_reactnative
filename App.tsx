/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useContext, useState, useEffect } from 'react';
import './src/config/StatusBarConfig';
import { SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { AuthProvider } from './src/navigation/AuthProvider';
import Routes from './src/navigation/Routes';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return(
  <>
  <StatusBar barStyle="dark-content" />
  <SafeAreaView></SafeAreaView>
  <AuthProvider>
      <Routes />
  </AuthProvider>
  </> );
  
};


export default App;
