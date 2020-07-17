import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [erro, setErro] = useState(false);

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          erro,
          login: async (user, password) => {    
            try {
              setErro(false);
              await auth().signInWithEmailAndPassword(user, password);
              
            } catch (e) {
              console.log(e);
              setErro(true);
              // console.log(erro);
            }

            return(erro);
          },
          register: async (email, password) => {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              console.log(e);
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