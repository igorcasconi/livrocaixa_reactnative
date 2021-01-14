import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import ConfirmScreen from '../pages/ConfirmScreen'

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
        component={Signup}
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
        name='ConfirmScreen'
        component={ConfirmScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginNavigation
