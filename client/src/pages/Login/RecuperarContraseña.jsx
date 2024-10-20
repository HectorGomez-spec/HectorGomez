import React from "react";
import styles from "../../styles/RecuperarContraseña.module.css";
import { Link } from "react-router-dom";
import logo from '../../Img/logo.svg';
import { useForm } from "react-hook-form";
import axios from '../../api/axios';
import {toast} from 'sonner';

function RecuperarContraseña() {
  const { register, handleSubmit } = useForm();
  return (
    <div className={styles.recovery_container}>
      <form className={styles.recovery_box} onSubmit={handleSubmit(async(values)=>{
        try {
          console.log(values);
          const resp = await axios.post('/recuperarContrasena',values);
          toast.success(resp.data.message);
          console.log(resp);
        } catch (error) {
          console.log(error);
        }
      })}>  
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
            {...register("CORREO",{required:true})}
            placeholder="📧 Correo Electrónico"
          />
        </div>
        <button
          type="submit"
          className={styles.submit}>
          Enviar
        </button>
        <div className={styles.back_link}>
          <p>
            <Link to="/">Volver al inicio de sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RecuperarContraseña;
