import { useState } from "react";
import { postToBackend } from "../services/api.js";
import CustomCard from "./ui/CustomCard";
import MyButton from "./ui/MyButton";
import { Gamepad2, Send, AlertCircle, CheckCircle, Hash } from "lucide-react";

/**
 * GameBoard - Interfaz para unirse a una partida activa
 */
export default function GameBoard() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pin) return setError("Por favor ingresa un PIN válido");
    
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const testData = {
        pin: pin,
        tipo: "join_game",
        fecha: new Date().toISOString()
      };

      const result = await postToBackend(testData);
      setResponse(result);
    } catch (err) {
      setError(err.message || "No se pudo conectar con la partida");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-game-panel">
      <CustomCard variant="yellow" icon={<Hash size={24} />} title="Unirse a Partida">
        <p style={{ marginBottom: "20px", fontSize: "0.95rem" }}>
          Ingresa el PIN que compartió tu profesor para comenzar el desafío.
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Ej: 882 194"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: "16px",
                paddingLeft: "45px",
                borderRadius: "12px",
                border: "2px solid #eee",
                fontSize: "1.2rem",
                fontWeight: "900",
                textAlign: "center",
                letterSpacing: "4px",
                backgroundColor: "#fff",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--color-primary)"}
              onBlur={(e) => e.target.style.borderColor = "#eee"}
            />
            <Hash size={20} style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
          </div>

          <MyButton 
            type="submit"
            variant="primary" 
            disabled={loading || !pin}
            fullWidth
            style={{ padding: "16px" }}
          >
            {loading ? "CONECTANDO..." : "INGRESAR AL JUEGO"}
          </MyButton>
        </form>

        {error && (
          <div style={{ 
            marginTop: "20px", 
            padding: "16px", 
            backgroundColor: "var(--color-kahoot-red)", 
            color: "#fff",
            borderRadius: "12px",
            fontWeight: "bold",
            boxShadow: "0 4px 0 #a9132d",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "0.9rem"
          }}>
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {response && (
          <div style={{ 
            marginTop: "20px", 
            padding: "16px", 
            backgroundColor: "var(--color-success)", 
            color: "#fff",
            borderRadius: "12px",
            fontWeight: "bold",
            boxShadow: "0 4px 0 #1b5e20",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "0.9rem"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={20} /> ¡PIN Correcto! Esperando al profesor...
            </div>
          </div>
        )}
      </CustomCard>
    </div>
  );
}


