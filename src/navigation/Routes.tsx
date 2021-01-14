import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'

import { useUser } from '../context/AuthContext'
import AuthNavigation from './AuthNavigation'
import LoginNavigation from './LoginNavigation'

export default function Routes() {
  const { user, setUser } = useUser()
  const [initializing, setInitializing] = useState<boolean>(true)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      setUser(userState)
      if (initializing) setInitializing(false)
    })
<<<<<<< HEAD
    return subscriber
=======
    return subscriber // unsubscribe on unmount
>>>>>>> 000880b (fix(app): fixed app)
  }, [])

  return user ? <AuthNavigation /> : <LoginNavigation />
}
