import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import MyButton from "./MyButton";

/**
 * Navbar - Barra de navegación dinámica
 * Cambia según el estado de autenticación del usuario
 */
export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🏹 Robin HOOT
      </Link>

      <div className="navbar-links">
        {usuario ? (
          <>
            <span className="navbar-user">Hola, {usuario.nombre}</span>
            <Link to="/dashboard">
              <MyButton variant="secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                Dashboard
              </MyButton>
            </Link>
            <MyButton
              variant="danger"
              onClick={handleLogout}
              style={{ padding: "8px 16px", fontSize: "0.85rem" }}
            >
              Salir
            </MyButton>
          </>
        ) : (
          <>
            <Link to="/login">
              <MyButton variant="secondary" style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                Iniciar Sesión
              </MyButton>
            </Link>
            <Link to="/register">
              <MyButton style={{ padding: "8px 16px", fontSize: "0.85rem" }}>
                Registrarse
              </MyButton>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
