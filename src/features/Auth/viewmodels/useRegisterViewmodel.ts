import { Keyboard } from 'react-native'
import { useUser } from '../../../context/AuthContext'
import { SignupProps } from '../models/RegisterModel'
import React from 'react'
import auth from '@react-native-firebase/auth'

export const useRegisterViewmodel = () => {
  const [loading, setLoading] = React.useState(false)
  const [isErrorRegister, setErrorRegister] = React.useState(false)

  const register = async (email: string, password: string) => {
    setLoading(true)
    try {
      setErrorRegister(false)
      await auth().createUserWithEmailAndPassword(email, password)
      setLoading(false)
    } catch (e) {
      setErrorRegister(true)
      setLoading(false)
    }
  }

  const onSubmit = (values: SignupProps) => {
    register(values.email, values.password)
    Keyboard.dismiss()
  }

  return { isErrorRegister, register, loading, onSubmit }
}
