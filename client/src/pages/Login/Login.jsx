import React, { useState, useEffect } from "react";
import image from "../../Img/logo.svg";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit,getValues } = useForm();
  const { login, verifyCode } = useAppContext();
  const [inputCodigo, setInputCodigo] = useState(false);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (inputCodigo && counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else if (counter === 0) {
      setResendEnabled(true);
    }
  }, [counter, inputCodigo]);

  const handleResendCode = async () => {
    try {
      setCounter(60);
      setResendEnabled(false);
      await login(getValues()); // Aquí puedes llamar a la función que reenvía el código
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.body}>
      <form
        style={styles.loginContainer}
        onSubmit={handleSubmit(async (values) => {
          try {
            console.log(values)
            if (!inputCodigo) {
              console.log('vine aca');
              const resp = await login(values);
              if (resp.IsValid) {
                setInputCodigo(true);
                return;
              }
            } else {
              console.log('vine aca 2');
              verifyCode(values);
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div style={styles.loginBox}>
          <img
            src={image}
            alt="Honduras Medical Center Logo"
            style={styles.logo}
          />
          <h1 style={styles.title}>
            Vigilancia Epidemiológica y Control de Lavado de Manos
          </h1>
          <h1 style={styles.subtitle}>Inicio de Sesión</h1>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              {...register("CORREO")}
              required
              placeholder="👤 Nombre de Usuario"
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              {...register("USER_PASSWORD")}
              required
              placeholder="🔒 Contraseña"
              style={styles.input}
            />
          </div>
          {inputCodigo && (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="codigo">Código de Acceso</label>
                <input
                  type="text"
                  {...register("CODIGO", { required: true })}
                  placeholder="🔒 Código de Acceso"
                  autoFocus
                  style={styles.input2}
                />
              </div>

              {/* Mostrar el contador de tiempo restante */}
              <p style={styles.counterText}>
                {resendEnabled
                  ? "Puedes reenviar el código"
                  : `Reenviar en ${counter}s`}
              </p>

              <button
                type="button"
                style={{width :"100%", padding: "10px", backgroundColor: resendEnabled ? "#ffc107":"White", border: "none", borderRadius: "5px", cursor: resendEnabled ? "pointer":"not-allowed", marginTop: "10px", fontSize: "16px", color: resendEnabled ? "white":"gray"}}
                onClick={handleResendCode}
                disabled={!resendEnabled}
              >
                Reenviar Código
              </button>
            </>
          )}
          <button type="submit" style={styles.submit}>
            Iniciar Sesión
          </button>
          <div style={styles.forgotPassword}>
            <p>
              <Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
            </p>
          </div>
          {/* <div style={styles.signupLink}>
            <p>
              ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div> */}
        </div>
      </form>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    margin: '40px auto',
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: "#e0f2f1",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  loginBox: {
    textAlign: "center",
  },
  title: {
    color: "#003366",
    marginBottom: "20px",
    fontSize: "16px",
  },
  subtitle: {
    color: "#003366",
    marginBottom: "20px",
    fontSize: "12px",
  },
  logo: {
    width: "250px",
    height: "auto",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  input2: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "2px solid green",
    borderRadius: "5px",
    fontSize: "14px",
  },
  submit: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#005f99",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px",
  },
  counterText: {
    color: "#0a0a2a", // Color rojo para el texto del contador
    fontSize: "12px",
    marginBottom: "10px",
  },
  forgotPassword: {
    fontSize: "12px",
    color: "#005f99",
    marginTop: "10px",
  },
  signupLink: {
    fontSize: "14px",
    color: "#003366",
    marginTop: "20px",
  },
};

export default Login;
