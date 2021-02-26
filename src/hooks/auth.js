import React, { createContext, useCallback, useContext, useState } from 'react';

import { auth } from "../utils/firebase";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@InoveMilk:token');

    if (token) {
      return { token };
    }

    return {};
  });

  const signIn = useCallback(async (UserCredential) => {
    const { user } = UserCredential;

    const token = user.getIdToken();

    localStorage.setItem('@InoveMilk:token', token);

    setData({ token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@InoveMilk:token');

    auth.signOut();

    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token , signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };