/**
 * PERSONA 2: Componente para mostrar ranking
 * Props: ranking (array de objetos con datos del ranking)
 * TODO: Mejorar estilos y agregar loading states
 */
export default function RankingTable({ ranking = [] }) {
  if (!ranking || ranking.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#aaa" }}>
        <p>📊 Aún no hay datos...</p>
      </div>
    );
  }

  const th = { padding: "10px", textAlign: "left", color: "#ffffff", background: "#00838f" };
  const td = { padding: "10px", color: "#263238", borderBottom: "1px solid #eceff1" };

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <h2 style={{ color: "#00838f" }}>🏆 Ranking</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Nombre</th>
            <th style={th}>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((p, idx) => (
            <tr key={p.usuarioId || idx}>
              <td style={td}>{idx + 1}</td>
              <td style={td}>{p.nombre || "Anónimo"}</td>
              <td style={{ ...td, fontWeight: "bold", color: "#00838f" }}>
                {p.puntaje || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
