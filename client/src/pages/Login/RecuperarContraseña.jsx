import React from "react";
import styles from "../../styles/RecuperarContraseña.module.css";
import { Link } from "react-router-dom";
import logo from '../../Img/logo.svg'

function RecuperarContraseña() {
  return (
    <div className={styles.recovery_container}>
      <div className={styles.recovery_box}>
        <img
          src={logo}
          alt="Honduras Medical Center Logo"
          className={styles.logo}
        />
        <h1>Recuperar Contraseña</h1>
        <p>Ingresa tu correo electrónico para recuperar tu contraseña.</p>
        <div className={styles.input_group}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="📧 Correo Electrónico"
          />
        </div>
        <button
          type="button"
          className={styles.submit}>
          Enviar
        </button>
        <div className={styles.back_link}>
          <p>
            <Link to="/">Volver al inicio de sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecuperarContraseña;
