import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import MyButton from "./MyButton";
import { Target, User, LayoutDashboard, LogOut, LogIn } from "lucide-react";

/**
 * Navbar - Barra de navegación institucional (Estilo Uniputumayo)
 */
export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <nav className="navbar" style={{ 
      backgroundColor: "var(--color-header)", 
      borderBottom: "2px solid #eee",
      padding: "16px 40px"
    }}>
      <Link to="/" className="navbar-logo" style={{ 
        color: "var(--color-primary)", 
        fontWeight: "900",
        fontSize: "1.6rem",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <Target size={28} style={{ color: "var(--color-primary)" }} /> Robin HOOT
      </Link>

      <div className="navbar-links" style={{ gap: "20px" }}>
        {usuario ? (
          <>
            <span className="navbar-user" style={{ color: "var(--color-text)", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={18} /> {usuario.nombre}
            </span>
            <Link to="/dashboard">
              <MyButton variant="primary" style={{ padding: "10px 20px" }}>
                <LayoutDashboard size={18} style={{ marginRight: "8px" }} /> Panel
              </MyButton>
            </Link>
            <MyButton
              variant="secondary"
              onClick={handleLogout}
              style={{ padding: "10px 20px" }}
            >
              <LogOut size={18} style={{ marginRight: "8px" }} /> Salir
            </MyButton>
          </>
        ) : (
          <>
            <Link to="/login">
              <MyButton variant="secondary" style={{ padding: "10px 20px" }}>
                <LogIn size={18} style={{ marginRight: "8px" }} /> Entrar
              </MyButton>
            </Link>
            <Link to="/register">
              <MyButton variant="primary" style={{ padding: "10px 20px" }}>
                <User size={18} style={{ marginRight: "8px" }} /> Unirse
              </MyButton>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}


