/**
 * MyButton - Componente de botón reutilizable
 * Soporta variantes: primary, secondary, danger
 * Muestra estado "Cargando..." con isSubmitting
 */
export default function MyButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  isSubmitting = false,
  fullWidth = false,
  style: customStyle = {},
}) {
  const base = {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: disabled || isSubmitting ? "not-allowed" : "pointer",
    transition: "background-color 0.3s, opacity 0.3s",
    opacity: disabled || isSubmitting ? 0.6 : 1,
    width: fullWidth ? "100%" : "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const variants = {
    primary: {
      backgroundColor: "#00838f",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "#00838f",
      border: "2px solid #00838f",
    },
    danger: {
      backgroundColor: "#d32f2f",
      color: "#fff",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isSubmitting}
      style={{ ...base, ...variants[variant], ...customStyle }}
    >
      {isSubmitting ? "Cargando..." : children}
    </button>
  );
}
