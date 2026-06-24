import { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Keyboard } from 'react-native'

import { LoginProps } from '../models/AuthModel'
import { useUser } from '../../../context/AuthContext'
import { useRealm } from '../../../context/RealmContext'

export const useAuthViewmodel = () => {
  const { user, logout } = useUser()
  const { authRepository } = useRealm()
  const [loading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  const login = async (user: string, password: string) => {
    setLoading(true)
    try {
      setError(false)

      await auth().signInWithEmailAndPassword(user, password)
      const isRegistered = authRepository.userHasRegistered(auth().currentUser?.uid!)
      if (!isRegistered) {
        authRepository.createUser(auth().currentUser?.uid!)
      }
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
