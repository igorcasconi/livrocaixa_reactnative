import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

<<<<<<< HEAD
import { Login, ForgotPassword, CompletionForgotPass, SignUp } from '../pages'
=======
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import ConfirmScreen from '../pages/ConfirmScreen'
>>>>>>> 000880b (fix(app): fixed app)

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
<<<<<<< HEAD
        component={SignUp}
=======
        component={Signup}
>>>>>>> 000880b (fix(app): fixed app)
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
<<<<<<< HEAD
        name='CompletionForgotPass'
        component={CompletionForgotPass}
=======
        name='ConfirmScreen'
        component={ConfirmScreen}
>>>>>>> 000880b (fix(app): fixed app)
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default LoginNavigation
