import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import MyButton from '../components/ui/MyButton';
import FormInput from '../components/ui/FormInput';
import CustomCard from '../components/ui/CustomCard';

const LoginPage = () => {
  // Usar el hook de autenticación
  const { login } = useAuth();

  // Estados para los inputs del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setIsSubmitting(true);
    setError('');

    try {
      // Hacer la petición POST al endpoint de login
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        // Si la respuesta es exitosa, obtener los datos
        const data = await response.json();
        // Usar la función login del contexto para guardar el token y usuario
        login(data.token, data.user); // Asumiendo que la respuesta incluye token y user
      } else {
        // Si hay error, mostrar mensaje
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      // Si hay error de conexión, mostrar mensaje
      setError('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <CustomCard title="Iniciar Sesión" style={{ maxWidth: '400px', width: '100%' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingresa tu email"
          />
          <FormInput
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingresa tu contraseña"
          />
          <MyButton
            type="submit"
            variant="primary"
            fullWidth
            isSubmitting={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </MyButton>
        </form>
        {error && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fdecea',
            border: '1px solid #d32f2f',
            borderRadius: '6px',
            color: '#d32f2f',
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
      </CustomCard>
    </div>
  );
};

export default LoginPage;