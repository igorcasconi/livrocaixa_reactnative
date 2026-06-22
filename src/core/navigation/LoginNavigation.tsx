import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { ParamsListLogin } from './type'
import ForgotPassword from '../../features/Auth/views/ForgotPassword'
import CompletionForgotPass from '../../features/Auth/views/CompletionForgotPass'
import Login from '../../features/Auth/views/Login'
import Register from '../../features/Auth/views/Register'

const Stack = createNativeStackNavigator<ParamsListLogin>()

const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name='CompletionForgotPass'
        component={CompletionForgotPass}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginNavigation
