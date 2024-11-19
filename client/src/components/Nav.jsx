import React from "react";
import usuarioLogo from "../Img/user.svg";
import logo from "../Img/logo.svg";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/nav.module.css";

function Nav() {
  const { logout, user } = useAppContext();

  useEffect(() => {}, []);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logo_img} />
          <h1 className="ms-5">Sistema de Vigilancia Epidemiológica</h1>
        </div>
        <div className={styles.sessionInfo}>
          <img src={usuarioLogo} alt="Usuario" className={styles.session_info_img} />
          {user && (
            <>
            <p>
              {user[0][0].NOMBRE} {user[0][0].APELLIDO}
            </p>
            <a href="#" onClick={logout} className={{ color: "#f8f9fa" }}>
              Cerrar Sesión
            </a>
            </>
          )}
        </div>
      </header>
      {user && (
        <nav className={styles.nav} id="main-nav">
          <ul className={styles.nav_ul}>
            <li className={styles.nav_ul_li}>
              <a href="/Perfil" className={styles.nav_ul_li_a}>Inicio</a>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Pacientes</a>
              <ul>
                <li><a href="/Paciente">Agregar Paciente</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Salas</a>
              <ul>
                <li><a href="/Salas">Salas</a></li>
                <li><a href="#">Historial de Salas</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Gestión</a>
              <ul>
                <li><a href="/Especialidad">Especialidad</a></li>
                <li><a href="/Vigilancia">Vigilancia</a></li>
                <li><a href="/ControlLavado">Control Lavado Manos</a></li>
                <li><a href="#">Reportes</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Estadísticas</a>
              <ul>
                <li><a href="#">Reportes Mensuales</a></li>
                <li><a href="#">Gráficos Comparativos</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Seguridad</a>
              <ul>
                <li><a href="/Usuarios">Usuarios</a></li>
                <li><a href="Objetos">Objetos</a></li>
                <li><a href="/Roles">Roles</a></li>
                <li><a href="/Parametros">Parámetros</a></li>
                <li><a href="/estadoUsuario">Estados</a></li>
                <li><a href="/Bitacora">Bitacora</a></li>
                <li><a href="/Permisos">Permisos</a></li>
              </ul>
            </li>
          </ul>
          
        </nav>
      )}

      <Outlet />
    </div>
  );
}

export default Nav;
