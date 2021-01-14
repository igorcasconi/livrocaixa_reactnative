import React, { createContext, useState, Dispatch, useContext, useEffect } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

interface ContextProps {
  user: FirebaseAuthTypes.User | null
  erro: boolean
  uid: string | null | undefined
  setUser: Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>
  login(user: string, password: string): Promise<void>
  register(email: string, password: string): Promise<void>
  verifyPassword(email: string): Promise<void>
  logout(): void
  loading: boolean
  erroRegister: boolean
  erroVerifyPassword: boolean
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
  const [erro, setErro] = useState<boolean>(false)
  const [uid, setUid] = useState<string | null | undefined>(null)
  const [erroRegister, setErroRegister] = useState<boolean>(false)
  const [erroVerifyPassword, setErroVerifyPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const login = async (user: string, password: string) => {
    setLoading(true)
    try {
      setErro(false)

      await auth().signInWithEmailAndPassword(user, password)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setErro(true)
      setLoading(false)
    }
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    try {
      setErroRegister(false)
      await auth().createUserWithEmailAndPassword(email, password)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setErroRegister(true)
      setLoading(false)
    }
  }

  const verifyPassword = async (email: string) => {
    setLoading(true)
    setErroVerifyPassword(false)
    try {
      setLoading(false)
      await auth().sendPasswordResetEmail(email)
    } catch (err) {
      setLoading(false)
      console.log(err)
      setErroVerifyPassword(true)
    }
  }

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
        login,
        user,
        setUser,
        erro,
        uid,
        erroRegister,
        loading,
        register,
        verifyPassword,
        logout,
        erroVerifyPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useUser = () => useContext(AuthContext)

export { AuthProvider, useUser }
