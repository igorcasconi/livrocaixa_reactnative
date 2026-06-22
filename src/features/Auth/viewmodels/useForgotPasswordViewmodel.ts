import { useNavigation } from '@react-navigation/native'
import { ForgotPasswordProps } from '../models/ForgotPasswordModel'
import React from 'react'
import auth from '@react-native-firebase/auth'

export const useForgotPasswordViewmodel = () => {
  const { navigate } = useNavigation()
  const [loading, setLoading] = React.useState(false)
  const [isErrorVerifyPassword, setIsErrorVerifyPassword] = React.useState(false)

  const verifyPassword = async (email: string) => {
    setLoading(true)
    try {
      setLoading(false)
      await auth().sendPasswordResetEmail(email)
    } catch (err) {
      setLoading(false)
      setIsErrorVerifyPassword(true)
    }
  }

  const onSubmit = (values: ForgotPasswordProps) => {
    verifyPassword(values.email)
    navigate('CompletionForgotPass', { email: values.email })
  }

  return { onSubmit, loading, verifyPassword, isErrorVerifyPassword }
}
