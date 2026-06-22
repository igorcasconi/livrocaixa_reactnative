import React, { createContext, useState, Dispatch, useContext, useEffect, PropsWithChildren } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface ContextProps {
  user: FirebaseAuthTypes.User | null
  uid: string | null | undefined
  setUser: Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>
  logout(): void
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [uid, setUid] = useState<string | null | undefined>(null)

  const logout = async () => {
    try {
      await auth().signOut()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (auth().currentUser?.uid) setUid(auth().currentUser?.uid)
  }, [auth().currentUser?.uid])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        uid,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useUser = () => useContext(AuthContext)

export { AuthProvider, useUser }
