import { useState, useEffect } from "react";
import RankingTable from "./components/RankingTable.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Login from "./components/Login.jsx";
import { getBackendData, logout } from "./services/api.js";

/**
 * PERSONA 4: App principal que integra todo
 * - Maneja autenticación
 * - Muestra Login si no hay token
 * - Muestra juego si hay usuario autenticado
 */
export default function App() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener usuario de localStorage
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (e) {
        console.error("Error parseando usuario:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!usuario) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        console.log("[App] Obteniendo datos del ranking...");
        const data = await getBackendData();
        setRanking(data);
      } catch (err) {
        console.error("[App] Error al cargar ranking:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usuario]);

  const handleLoginSuccess = (usuarioData) => {
    setUsuario(usuarioData);
    setLoading(true);
    setError(null);
  };

  const handleLogout = () => {
    logout();
    setUsuario(null);
    setRanking([]);
    setError(null);
  };

  // Si no hay usuario, mostrar Login
  if (!usuario) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Si hay usuario, mostrar el juego
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", color: "#fff", background: "#1a1a1a", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#f5c518", margin: 0 }}>🎯 Proyecto - Frontend & Backend</h1>
        <div style={{ textAlign: "right" }}>
          <p style={{ color: "#aaa", margin: "0 0 5px 0", fontSize: "14px" }}>
            👤 {usuario.nombre}
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ff6b6b",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <p style={{ textAlign: "center", color: "#aaa" }}>Conexión React + Express + Socket.io</p>

      {loading && <p style={{ textAlign: "center" }}>⏳ Cargando datos...</p>}
      {error && <p style={{ textAlign: "center", color: "#ff6b6b" }}>❌ Error: {error}</p>}

      <GameBoard />
      <RankingTable ranking={ranking} />

      <footer style={{ marginTop: "40px", textAlign: "center", color: "#666", fontSize: "12px" }}>
        <p>Backend URL: {import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}</p>
      </footer>
    </div>
  );
}
