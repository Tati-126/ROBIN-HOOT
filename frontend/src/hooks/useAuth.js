import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Custom hook para usar el contexto de autenticación
export const useAuth = () => {
  // Obtener el contexto
  const context = useContext(AuthContext);

  // Verificar que se esté usando dentro del AuthProvider
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  // Retornar el contexto (usuario, token, login, logout)
  return context;
};