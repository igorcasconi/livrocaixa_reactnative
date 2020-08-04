import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          erro,
          loading,
          login: async (user, password) => {   
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
          register: async (email, password) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
            }
          },
          verifyPassword: async (email) => {
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