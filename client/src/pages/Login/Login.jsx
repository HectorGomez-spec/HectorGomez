import React from 'react';
import image from "../../Img/logo.svg"
import {useForm} from 'react-hook-form';
import axios from '../../api/axios';
import { useAppContext } from '../../context/AppContext';

const Login = () => {
    const {register, handleSubmit} = useForm();
    const {login} = useAppContext();
    return (
        <div style={styles.body}>
            <form style={styles.loginContainer} onSubmit={handleSubmit(async(values)=>{
                try {
                    login(values);
                } catch (error) {
                    console.log(error);
                }
            })}>
                <div style={styles.loginBox}>
                    <img 
                        src={image}
                        alt="Honduras Medical Center Logo" 
                        style={styles.logo} 
                    />
                    <h1 style={styles.title}>Vigilancia Epidemiológica <br /> <p>Y</p> Control de Lavado de Manos</h1>
                    <h1 style={styles.subtitle}>Inicio de Sesión</h1>
                    <div style={styles.inputGroup}>
                        <label htmlFor="username">Usuario</label>
                        <input 
                            type="text" 
                            {...register('CORREO')}
                            required 
                            placeholder="👤 Nombre de Usuario"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            {...register('USER_PASSWORD')}
                            required 
                            placeholder="🔒 Contraseña"
                            style={styles.input}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={styles.submit} 
                        
                    >
                        Iniciar Sesión
                    </button>
                    <div style={styles.forgotPassword}>
                        <p><a href="/Pages/recuperarcontrasena.html">¿Olvidaste tu contraseña?</a></p>
                    </div>
                    <div style={styles.signupLink}>
                        <p>¿No tienes una cuenta? <a href="/Pages/registro.html">Regístrate aquí</a></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f4f4f4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loginContainer: {
        backgroundColor: '#e0f2f1',
        padding: '90px',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '300px',
    },
    loginBox: {
        textAlign: 'center',
    },
    title: {
        color: '#003366',
        marginBottom: '20px',
        fontSize: '20px',
    },
    subtitle: {
        color: '#003366',
        marginBottom: '20px',
        fontSize: '20px',
    },
    logo: {
        width: '250px',
        height: 'auto',
        marginBottom: '20px',
    },
    inputGroup: {
        marginBottom: '15px',
        textAlign: 'left',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '14px',
    },
    submit: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#005f99',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        fontSize: '16px',
    },
    forgotPassword: {
        fontSize: '12px',
        color: '#005f99',
        marginTop: '10px',
    },
    signupLink: {
        fontSize: '14px',
        color: '#003366',
        marginTop: '20px',
    }
};

export default Login;
