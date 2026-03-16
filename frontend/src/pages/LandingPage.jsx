import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MyButton from "../components/ui/MyButton";
import CustomCard from "../components/ui/CustomCard";

/**
 * LandingPage - Página de aterrizaje principal (ruta /)
 * Incluye Hero + 2 secciones informativas
 */
export default function LandingPage() {
  const { usuario } = useAuth();

  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="hero">
        <h1>Aprende Jugando con Robin HOOT</h1>
        <p>
          Plataforma de quizzes interactivos de la Universidad del Putumayo.
          Crea partidas, compite con tus compañeros y sube en el ranking mientras aprendes.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          {usuario ? (
            <Link to="/dashboard">
              <MyButton>Ir al Dashboard</MyButton>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <MyButton>Comenzar Gratis</MyButton>
              </Link>
              <Link to="/login">
                <MyButton variant="secondary">Ya tengo cuenta</MyButton>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ─── Sección: Características ─────────────────────── */}
      <section className="section section-dark">
        <h2 className="section-title">¿Por qué Robin HOOT?</h2>
        <p className="section-subtitle">
          Todo lo que necesitas para aprender de forma divertida
        </p>
        <div className="features-grid">
          <CustomCard icon="⚡" title="Tiempo Real">
            Partidas en vivo con Socket.io. Compite contra otros jugadores
            y mira los resultados al instante.
          </CustomCard>
          <CustomCard icon="🏆" title="Rankings">
            Sistema de puntuación y rankings para motivar el aprendizaje
            competitivo entre compañeros.
          </CustomCard>
          <CustomCard icon="🎯" title="Quizzes Personalizados">
            Crea tus propias preguntas con múltiples opciones de respuesta
            y categorías temáticas.
          </CustomCard>
        </div>
      </section>

      {/* ─── Sección: Cómo Funciona ───────────────────────── */}
      <section className="section">
        <h2 className="section-title">¿Cómo Funciona?</h2>
        <p className="section-subtitle">En solo 3 pasos estarás jugando</p>
        <div className="steps-grid">
          <CustomCard
            icon="1️⃣"
            title="Regístrate"
            style={{ textAlign: "center" }}
          >
            Crea tu cuenta en segundos y accede a todas las funcionalidades de la plataforma.
          </CustomCard>
          <CustomCard
            icon="2️⃣"
            title="Únete a una Partida"
            style={{ textAlign: "center" }}
          >
            Ingresa el PIN de la sesión que compartió tu profesor o crea tu propia partida.
          </CustomCard>
          <CustomCard
            icon="3️⃣"
            title="¡Compite y Aprende!"
            style={{ textAlign: "center" }}
          >
            Responde las preguntas, acumula puntos y escala en el ranking global.
          </CustomCard>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="footer">
        <p>© 2026 Robin HOOT — Universidad del Putumayo</p>
      </footer>
    </>
  );
}
