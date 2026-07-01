import React from 'react'
import auth from '@react-native-firebase/auth'

import { ForgotPasswordProps } from '../models/ForgotPasswordModel'

export const useForgotPasswordViewmodel = () => {
  const [loading, setLoading] = React.useState(false)
  const [isErrorVerifyEmail, setIsErrorVerifyEmail] = React.useState(false)
  const [isGoToCompletionScreen, setIsGoToCompletionScreen] = React.useState(false)

  const handleVerifyEmail = async (email: string) => {
    setLoading(true)
    try {
      setLoading(false)
      await auth().sendPasswordResetEmail(email)
      setIsGoToCompletionScreen(true)
    } catch (err) {
      setLoading(false)
      setIsErrorVerifyEmail(true)
      setIsGoToCompletionScreen(false)
    }
  }

  const informationDataWithError = (email: string) => {
    const text = isErrorVerifyEmail
      ? `Ocorreu um erro ao alterar a senha, possivelmente o e-mail ${email} não está cadastrado!`
      : `O link de alteração de senha foi enviado para o e-mail ${email}, acesse o link no seu e-mail e realize a alteração da senha.`
    const icon = isErrorVerifyEmail ? 'alert-circle-outline' : 'checkmark-circle-outline'
    const color = isErrorVerifyEmail ? 'red' : 'white'

    return { text, icon, color }
  }

  const onSubmit = (values: ForgotPasswordProps) => {
    handleVerifyEmail(values.email)
  }

  return { onSubmit, loading, handleVerifyEmail, isErrorVerifyEmail, informationDataWithError, isGoToCompletionScreen }
}
