import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { getBackendData } from "../services/api";
import CustomCard from "../components/ui/CustomCard";
import MyButton from "../components/ui/MyButton";
import RankingTable from "../components/RankingTable";
import { useNavigate } from "react-router-dom";
import { User, Trophy, Star, Activity, LogOut, Settings, Gamepad2 } from "lucide-react";

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
    <div className="dashboard" style={{ padding: "40px 20px" }}>
      <div className="dashboard-header" style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--color-primary)" }}>
          ¡Hola, {usuario?.nombre}! <Gamepad2 size={32} style={{ verticalAlign: "middle", marginLeft: "8px" }} />
        </h1>
        <p style={{ fontSize: "1.1rem", fontWeight: "500" }}>Bienvenido a tu panel de Robin HOOT</p>
      </div>

      {/* ─── Stats ────────────────────────────────────────── */}
      <div className="dashboard-grid" style={{ marginBottom: "40px" }}>
        <CustomCard variant="blue" title="Puntuación" icon={<Star size={24} />}>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", textAlign: "center" }}>{ranking.length * 10}</div>
          <p style={{ textAlign: "center" }}>Puntos acumulados</p>
        </CustomCard>
        <CustomCard variant="purple" title="Partidas" icon={<Activity size={24} />}>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", textAlign: "center" }}>5</div>
          <p style={{ textAlign: "center" }}>Completadas esta semana</p>
        </CustomCard>
        <CustomCard variant="yellow" title="Ranking UP" icon={<Trophy size={24} />}>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", textAlign: "center" }}>#3</div>
          <p style={{ textAlign: "center" }}>Posición global</p>
        </CustomCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
        {/* ─── Info del usuario ─────────────────────────────── */}
        <CustomCard icon={<User size={24} />} title="Perfil Académico" variant="primary">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
            <p><strong>Nombre:</strong> {usuario?.nombre}</p>
            <p><strong>Email:</strong> {usuario?.email}</p>
            <p><small style={{ opacity: 0.6 }}>ID: {usuario?._id || "UP-USER"}</small></p>
            <MyButton variant="secondary" style={{ marginTop: "10px" }}>
              <Settings size={18} style={{ marginRight: "8px" }} /> Editar Perfil
            </MyButton>
          </div>
        </CustomCard>

        {/* ─── Ranking ──────────────────────────────────────── */}
        <CustomCard icon={<Trophy size={24} />} title="Líderes de la Semana" variant="yellow">
          {loading && <p style={{ textAlign: "center" }}>Buscando jugadores...</p>}
          {error && <p style={{ color: "var(--color-error)", textAlign: "center" }}>Error: {error}</p>}
          {!loading && !error && <RankingTable ranking={ranking} />}
        </CustomCard>
      </div>

      {/* ─── Logout ──────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <MyButton variant="danger" onClick={handleLogout} style={{ padding: "14px 40px" }}>
          <LogOut size={20} style={{ marginRight: "8px" }} /> CERRAR SESIÓN
        </MyButton>
      </div>
    </div>
  );
}


