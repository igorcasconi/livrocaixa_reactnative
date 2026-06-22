import { Keyboard } from 'react-native'
import { useUser } from '../../../context/AuthContext'
import { LoginProps } from '../models/AuthModel'
import React from 'react'
import auth from '@react-native-firebase/auth'

export const useAuthViewmodel = () => {
  const { user, logout } = useUser()
  const [loading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(false)

  const login = async (user: string, password: string) => {
    setLoading(true)
    try {
      setError(false)

      await auth().signInWithEmailAndPassword(user, password)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }

  const onSubmit = (values: LoginProps) => {
    login(values.user, values.password)
    Keyboard.dismiss()
  }

  return {
    user,
    loading,
    login,
    logout,
    isError,
    onSubmit
  }
}
