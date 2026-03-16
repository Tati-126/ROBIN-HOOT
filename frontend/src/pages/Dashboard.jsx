import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getBackendData } from "../services/api";
import CustomCard from "../components/ui/CustomCard";
import MyButton from "../components/ui/MyButton";
import RankingTable from "../components/RankingTable";
import { useNavigate } from "react-router-dom";

/**
 * Dashboard - Página protegida del usuario autenticado
 * Muestra info del usuario, estadísticas y ranking
 */
export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getBackendData();
        setRanking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Bienvenido, {usuario?.nombre}</h1>
        <p>Panel principal de Robin HOOT</p>
      </div>

      {/* ─── Stats ────────────────────────────────────────── */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-value">{ranking.length}</div>
          <div className="stat-label">Jugadores en Ranking</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{usuario?.email || "—"}</div>
          <div className="stat-label" style={{ marginTop: "8px" }}>Tu Email</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: "#2e7d32" }}>Activo</div>
          <div className="stat-label">Estado de Sesión</div>
        </div>
      </div>

      {/* ─── Info del usuario ─────────────────────────────── */}
      <CustomCard icon="👤" title="Información del Usuario" style={{ marginBottom: "25px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginTop: "10px" }}>
          <div>
            <strong style={{ color: "#fff" }}>Nombre:</strong>
            <p>{usuario?.nombre}</p>
          </div>
          <div>
            <strong style={{ color: "#fff" }}>Email:</strong>
            <p>{usuario?.email}</p>
          </div>
          <div>
            <strong style={{ color: "#fff" }}>ID:</strong>
            <p style={{ fontSize: "0.85rem" }}>{usuario?._id || usuario?.id || "—"}</p>
          </div>
        </div>
      </CustomCard>

      {/* ─── Ranking ──────────────────────────────────────── */}
      <CustomCard icon="🏆" title="Ranking de Jugadores" style={{ marginBottom: "25px" }}>
        {loading && <p style={{ textAlign: "center" }}>Cargando datos...</p>}
        {error && <p style={{ color: "#d32f2f", textAlign: "center" }}>Error: {error}</p>}
        {!loading && !error && <RankingTable ranking={ranking} />}
      </CustomCard>

      {/* ─── Logout ──────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <MyButton variant="danger" onClick={handleLogout}>
          Cerrar Sesión
        </MyButton>
      </div>

      <footer className="footer" style={{ marginTop: "40px", border: "none", background: "transparent" }}>
        <p>Backend: {import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}</p>
      </footer>
    </div>
  );
}
