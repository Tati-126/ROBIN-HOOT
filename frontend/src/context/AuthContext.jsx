import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para el usuario y el token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Función para hacer login
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    // Guardar el token en localStorage
    localStorage.setItem('token', newToken);
  };

  // Función para hacer logout
  const logout = () => {
    setToken(null);
    setUser(null);
    // Remover el token de localStorage
    localStorage.removeItem('token');
  };

  // Al cargar la aplicación, verificar si hay token en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Aquí podrías verificar el token con el backend si es necesario
      // Por simplicidad, asumimos que es válido y lo usamos
      setToken(storedToken);
      // Nota: En un proyecto real, deberías validar el token con el servidor
    }
  }, []);

  // Valor que se pasa a los componentes hijos
  const value = {
    user,
    token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportar el contexto para usarlo en el hook
export default AuthContext;