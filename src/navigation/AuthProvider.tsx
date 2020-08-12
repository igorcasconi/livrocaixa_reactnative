import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [erro, setErro] = useState<boolean>(false);
    const [erroRegister, setErroRegister] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          erro,
          erroRegister,
          loading,
          
          login: async (user: string, password: string) => {   
            setLoading(true); 
            try {
              setErro(false);
              await auth().signInWithEmailAndPassword(user, password);
              
            } catch (e) {
              console.log(e);
              setErro(true);
              setLoading(false);
            }

          },
          
          register: async (email: string, password: string) => {
            setLoading(true);
            try {
              setErroRegister(false);
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
              setErroRegister(true);
              setLoading(false)
            }
          },
          
          verifyPassword: async (email: string) => {
            try{
              await auth().sendPasswordResetEmail(email);
            }catch (err) {
              console.log(err);
            }
          },

          logout: async () => {
            try {
              await auth().signOut();
              setErro(false);
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };