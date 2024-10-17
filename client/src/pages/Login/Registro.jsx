import React, { useState } from "react";
import styles from "../../styles/Registro.module.css";
import { Link } from "react-router-dom";
import logo from "../../Img/logo.svg";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Registro() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.register_container}>
      <div className={styles.register_box}>
        <div className={styles.logo_container}>
          <img
            src={logo}
            alt="Honduras Medical Center Logo"
            className={styles.logo}
          />
        </div>
        <h1>Registro de Usuario</h1>
        <form
          onSubmit={handleSubmit(async (values) => {
            try {
              const resp = await axios.post("/register", values);
              toast.success(resp.data.message);
               navigate("/");
            } catch (error) {
              toast.error(error.response.data.message, {
                style: {
                  backgroundColor: "#F08080",
                  border: "none",
                  color: "#fff",
                },
              });
            }
          })}
          className={styles.register_form}>
          <div className={styles.input_group}>
            <label htmlFor="username">Nombre</label>
            <input
              type="text"
              {...register("Nombre", { required: true })}
              placeholder="👤 Nombre"
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="username">Apellido</label>
            <input
              type="text"
              {...register("Apellido", { required: true })}
              placeholder="👤 Apellido"
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email">Direccion</label>
            <input
              type="text"
              {...register("Direccion", { required: true })}
              placeholder="📍 Direccion"
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email">Fecha de Nacimiento</label>
            <input
              type="date"
              {...register("Fecha_Nacimiento", { required: true })}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              {...register("Correo", { required: true })}
              placeholder="✉️ Correo Electrónico"
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email">Telefono</label>
            <input
              type="text"
              {...register("Telefono", { required: true })}
              placeholder="📱 Telefono"
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="password">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("User_Password", { required: true })}
              placeholder="🔒 Contraseña"
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("User_Password2", { required: true })}
              placeholder="🔒 Confirmar Contraseña"
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="showPassword"
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" style={{ fontSize: "12px" }}>
              Mostrar Contraseña
            </label>
          </div>
          <button type="submit" className={styles.btn_registro}>
            Registrarse
          </button>
        </form>
        <div className={styles.login_link}>
          <p>
            ¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
