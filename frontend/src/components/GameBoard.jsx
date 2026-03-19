import { useState } from "react";
import { postToBackend } from "../services/api.js";
import CustomCard from "./ui/CustomCard";
import MyButton from "./ui/MyButton";
import { Gamepad2, Send, AlertCircle, CheckCircle } from "lucide-react";

/**
 * GameBoard - Componente de prueba de conexión con estilo gamificado
 */
export default function GameBoard() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const testData = {
        usuarioId: "user-test-123",
        sessionId: "session-up-2026",
        respuesta: "Kahoot-Style-Active",
      };

      const result = await postToBackend(testData);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <CustomCard variant="yellow" icon={<Gamepad2 size={24} />} title="Prueba de Conexión">
        <p style={{ marginBottom: "20px" }}>
          Utiliza este panel para verificar la comunicación en tiempo real con el servidor de la Universidad.
        </p>
        
        <MyButton 
          variant="yellow" 
          onClick={handleSubmit} 
          disabled={loading}
          fullWidth
          style={{ padding: "16px" }}
        >
          {loading ? "CONECTANDO..." : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><Send size={18} /> ENVIAR SEÑAL DE PRUEBA</span>}
        </MyButton>

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
            gap: "10px"
          }}>
            <AlertCircle size={20} /> Error de Conexión: {error}
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
            gap: "10px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={20} /> Conexión Exitosa:
            </div>
            <pre style={{ 
              marginTop: "8px", 
              fontSize: "0.8rem", 
              backgroundColor: "rgba(0,0,0,0.2)", 
              padding: "8px",
              borderRadius: "8px",
              overflowX: "auto"
            }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </CustomCard>
    </div>
  );
}

