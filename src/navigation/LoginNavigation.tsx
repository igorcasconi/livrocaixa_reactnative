import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Login, ForgotPassword, CompletionForgotPass, SignUp } from '../pages'

import { ParamsListLogin } from './type'

const Stack = createStackNavigator<ParamsListLogin>()

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
        name='SignUp'
        component={SignUp}
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
