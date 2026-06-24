import React from 'react'
import auth from '@react-native-firebase/auth'

import { ForgotPasswordProps } from '../models/ForgotPasswordModel'

export const useForgotPasswordViewmodel = () => {
  const [loading, setLoading] = React.useState(false)
  const [isErrorVerifyEmail, setIsErrorVerifyEmail] = React.useState(false)

  const handleVerifyEmail = async (email: string) => {
    setLoading(true)
    try {
      setLoading(false)
      await auth().sendPasswordResetEmail(email)
    } catch (err) {
      setLoading(false)
      setIsErrorVerifyEmail(true)
    }
  }

  const onSubmit = (values: ForgotPasswordProps) => {
    handleVerifyEmail(values.email)
  }

  return { onSubmit, loading, handleVerifyEmail, isErrorVerifyEmail }
}
