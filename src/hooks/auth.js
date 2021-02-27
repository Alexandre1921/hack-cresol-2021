import React, { createContext, useCallback, useContext, useState } from 'react';

import { db, auth } from "../utils/firebase";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@InoveMilk:token');
    const role = localStorage.getItem('@InoveMilk:role');
    const uid = localStorage.getItem('@InoveMilk:uid');

    if (token && role) {
      return { token, role, uid };
    }

    return {};
  });

  const signIn = useCallback(async (UserCredential) => {
    const { user } = UserCredential;

    const token = user.getIdToken();
    const uid = user.uid;

    db.collection("usuario").where("idFirebase","==",uid).get()
    .then(query=>!query.empty?query.docs[0]:Promise.reject("Usuário não encontrado"))
    .then((doc)=>{
      if (doc.exists) {
        const { tpUsuario } = doc.data();
        localStorage.setItem('@InoveMilk:token', token);
        localStorage.setItem('@InoveMilk:role', tpUsuario);
        localStorage.setItem('@InoveMilk:uid', uid);

        setData({ token, role: tpUsuario, uid });
      }
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@InoveMilk:token');
    localStorage.removeItem('@InoveMilk:role');
    localStorage.removeItem('@InoveMilk:uid');

    auth.signOut();

    setData({});
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, role: data.role, uid:data.uid, signIn, signOut }}
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