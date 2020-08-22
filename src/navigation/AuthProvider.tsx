import React, { createContext, useState, Dispatch } from 'react';
import auth from '@react-native-firebase/auth';

interface ContextProps {
  user: object | null;
  erro: boolean;
  setUser: Dispatch<React.SetStateAction<object | null>>;
  login(user: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  verifyPassword(email: string): Promise<void>;
  logout(): void;
  loading: boolean;
  erroRegister: boolean;
  erroVerifyPassword: boolean;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

export const AuthProvider: React.FC = ({children}) => {
    const [user, setUser] = useState<object | null>(null);
    const [erro, setErro] = useState<boolean>(false);
    const [erroRegister, setErroRegister] = useState<boolean>(false);
    const [erroVerifyPassword, setErroVerifyPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (user: string, password: string) => {   
      setLoading(true); 
      try {
        setErro(false);
        await auth().signInWithEmailAndPassword(user, password);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setErro(true);
        setLoading(false);
      }
    }

    const register = async (email: string, password: string) => {
      setLoading(true);
      try {
        setErroRegister(false);
        await auth().createUserWithEmailAndPassword(email, password);
      } catch (e) {
        console.log(e);
        setErroRegister(true);
        setLoading(false)
      }
    }

    const verifyPassword = async (email: string) => {
      setLoading(true);
      setErroVerifyPassword(false);
      try{
        await auth().sendPasswordResetEmail(email);
        setLoading(false);
      }catch (err) {
        console.log(err);
        setLoading(false);
        setErroVerifyPassword(true);
      }
    }

    const logout = async () => {
      try {
        await auth().signOut();
      } catch (e) {
        console.error(e);
      }
    }


    return (
      <AuthContext.Provider value={{login, user, setUser, erro, erroRegister, loading, register, verifyPassword, logout, erroVerifyPassword }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;