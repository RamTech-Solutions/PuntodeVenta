import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../firebase-config.js"; // Importa la configuración de Firebase

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para controlar la carga
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Cambia `loading` a `false` después de verificar el usuario
    });

    return () => unsubscribe(); // Limpieza del listener al desmontar el componente
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export default AuthContext;
