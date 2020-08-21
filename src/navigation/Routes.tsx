import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import AuthContext from './AuthProvider';
import AuthNavigation from './AuthNavigation';
import LoginNavigation from './LoginNavigation';

export default function Routes() {  
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return user ? <AuthNavigation /> : <LoginNavigation />;

}