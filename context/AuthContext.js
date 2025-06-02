import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoadingAuth(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
};

