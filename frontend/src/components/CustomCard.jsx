/**
 * CustomCard - Tarjeta reutilizable para mostrar contenido
 * Acepta título, ícono y children
 */
export default function CustomCard({ title, icon, children, style: customStyle = {} }) {
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "28px",
    border: "1px solid #cfd8dc",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.3s, box-shadow 0.3s",
    ...customStyle,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: title ? "15px" : "0",
  };

  const iconStyle = {
    fontSize: "1.8rem",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#00838f",
  };

  return (
    <div style={cardStyle}>
      {(icon || title) && (
        <div style={headerStyle}>
          {icon && <span style={iconStyle}>{icon}</span>}
          {title && <h3 style={titleStyle}>{title}</h3>}
        </div>
      )}
      <div style={{ color: "#607d8b", lineHeight: "1.6" }}>{children}</div>
    </div>
  );
}
