import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MyButton from "../components/ui/MyButton";
import CustomCard from "../components/ui/CustomCard";

/**
 * LandingPage - Estilo Kahoot + Uniputumayo
 */
export default function LandingPage() {
  const { usuario } = useAuth();

  return (
    <div className="landing-page">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="hero" style={{ 
        background: "linear-gradient(180deg, var(--color-primary) 0%, #113f15 100%)",
        padding: "100px 20px",
        borderRadius: "0 0 40px 40px",
        boxShadow: "var(--shadow-tactile)"
      }}>
        <h1 style={{ fontSize: "3.5rem", fontWeight: "900", letterSpacing: "-1px" }}>
          🏹 Robin HOOT
        </h1>
        <p style={{ fontSize: "1.4rem", opacity: "0.9", fontWeight: "500", marginBottom: "40px" }}>
          ¡Aprende jugando en la Universidad del Putumayo!
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {usuario ? (
            <Link to="/dashboard">
              <MyButton variant="yellow" style={{ fontSize: "1.2rem", padding: "16px 40px" }}>
                Ir al Dashboard
              </MyButton>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <MyButton variant="yellow" style={{ fontSize: "1.2rem", padding: "16px 40px" }}>
                  ¡Empieza ahora!
                </MyButton>
              </Link>
              <Link to="/login">
                <MyButton variant="secondary" style={{ fontSize: "1.2rem", padding: "16px 40px" }}>
                  Entrar
                </MyButton>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ─── Sección: Características ─────────────────────── */}
      <section className="section" style={{ padding: "80px 20px" }}>
        <h2 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "40px" }}>
          ¿Por qué Robin HOOT?
        </h2>
        <div className="features-grid">
          <CustomCard 
            variant="purple" 
            icon="⚡" 
            title="En Vivo"
          >
            Participa en partidas en tiempo real con tus compañeros y compite por el primer lugar.
          </CustomCard>
          <CustomCard 
            variant="blue" 
            icon="🏆" 
            title="Ranking"
          >
            Gana puntos por rapidez y precisión. ¡Demuestra que eres el mejor de la UP!
          </CustomCard>
          <CustomCard 
            variant="yellow" 
            icon="🎯" 
            title="Dinámico"
          >
            Quizzes interactivos diseñados para reforzar lo aprendido en clase de forma divertida.
          </CustomCard>
        </div>
      </section>

      {/* ─── Sección: Pasos ──────────────────────────────── */}
      <section className="section section-dark" style={{ backgroundColor: "#f9f9f9", borderRadius: "40px 40px 0 0" }}>
        <div className="steps-grid">
          <CustomCard variant="red" icon="1️⃣" title="Regístrate">
            Crea tu perfil institucional en segundos.
          </CustomCard>
          <CustomCard variant="primary" icon="2️⃣" title="Únete">
            Ingresa el código de la partida de tu profesor.
          </CustomCard>
          <CustomCard variant="blue" icon="3️⃣" title="¡Gana!">
            Responde rápido y sube al podio.
          </CustomCard>
        </div>
      </section>

      <footer className="footer" style={{ marginTop: "0" }}>
        <p>© 2026 Robin HOOT — Universidad del Putumayo</p>
      </footer>
    </div>
  );
}

