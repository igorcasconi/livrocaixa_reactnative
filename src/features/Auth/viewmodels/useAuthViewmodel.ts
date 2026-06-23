import { Keyboard } from 'react-native'
import { useUser } from '../../../context/AuthContext'
import { LoginProps } from '../models/AuthModel'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useRealm } from '../../../context/RealmContext'

export const useAuthViewmodel = () => {
  const { user, logout } = useUser()
  const { realm } = useRealm()
  const [loading, setLoading] = useState(false)
  const [isError, setError] = useState(false)

  const createUserFirebase = (uid: string) => {
    realm?.write(() => realm.create('Users', { userId: uid }))
  }

  const userFirebaseRegistered = (uid?: string | null) => {
    const userData = realm?.objects('Users').filtered(`idFirebase = "${uid}"`)
    return !!userData
  }

  const login = async (user: string, password: string) => {
    setLoading(true)
    try {
      setError(false)

      await auth().signInWithEmailAndPassword(user, password)
      const isRegistered = userFirebaseRegistered(auth().currentUser?.uid!)
      if (!isRegistered) {
        createUserFirebase(auth().currentUser?.uid!)
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
