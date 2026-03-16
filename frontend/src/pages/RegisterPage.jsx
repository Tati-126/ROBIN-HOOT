import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registrarUsuario } from "../services/api";
import FormInput from "../components/ui/FormInput";
import MyButton from "../components/ui/MyButton";
import Modal from "../components/ui/Modal";

const registerSchema = z
  .object({
    nombre: z
      .string()
      .min(1, "El nombre es requerido")
      .min(2, "Mínimo 2 caracteres"),
    email: z
      .string()
      .min(1, "El email es requerido")
      .email("Ingresa un email válido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(6, "Mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

/**
 * RegisterPage - Página de registro de usuario
 * Usa React Hook Form + Zod para validaciones
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registrarUsuario(data.nombre, data.email, data.password);
      setModalOpen(true);
    } catch (err) {
      setError("root", {
        message: err.message || "Error al registrarse",
      });
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>🏹 Crear Cuenta</h2>
          <p className="auth-subtitle">Regístrate para empezar a jugar</p>

          {errors.root && (
            <div style={{
              color: "#d32f2f",
              backgroundColor: "#fdecea",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              marginBottom: "16px",
              textAlign: "center",
            }}>
              {errors.root.message}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
              error={errors.nombre?.message}
              {...register("nombre")}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="tu@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <FormInput
              label="Contraseña"
              type="password"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
              {...register("password")}
            />
            <FormInput
              label="Confirmar Contraseña"
              type="password"
              placeholder="Repite tu contraseña"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <MyButton type="submit" fullWidth isSubmitting={isSubmitting}>
              Registrarse
            </MyButton>
          </form>

          <div className="auth-toggle">
            ¿Ya tienes cuenta?
            <Link to="/login">Inicia sesión aquí</Link>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={handleModalClose} title="¡Registro Exitoso!">
        <p style={{ color: "#607d8b", marginBottom: "20px" }}>
          Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.
        </p>
        <MyButton onClick={handleModalClose} fullWidth>
          Ir a Iniciar Sesión
        </MyButton>
      </Modal>
    </div>
  );
}
