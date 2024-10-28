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
          <h1>Sistema de Vigilancia Epidemiológica Y Control de Lavado de Manos</h1>
        </div>
        <div className={styles.sessionInfo}>
          <img src={usuarioLogo} alt="Usuario" className={styles.session_info_img} />
          <br />
          {user && (
            <a href="#" onClick={logout} className={{ color: "#f8f9fa" }}>
              Cerrar Sesión
            </a>
          )}
        </div>
      </header>
      {user && (
        <nav className={styles.nav} id="main-nav">
          <ul className={styles.nav_ul}>
            <li className={styles.nav_ul_li}>
              <a href="/Pages/index.html" className={styles.nav_ul_li_a}>Inicio</a>
              <ul>
                <li><a href="#">Submenú 1</a></li>
                <li><a href="#">Submenú 2</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Pacientes</a>
              <ul>
                <li><a href="#">Agregar Paciente</a></li>
                <li><a href="#">Listar Pacientes</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="salas.html" className={styles.nav_ul_li_a}>Salas</a>
              <ul>
                <li><a href="#">Salas disponibles</a></li>
                <li><a href="#">Historial de Salas</a></li>
              </ul>
            </li>
            <li className={styles.nav_ul_li}>
              <a href="#" className={styles.nav_ul_li_a}>Gestión</a>
              <ul>
                <li><a href="#">Gestión de Personal</a></li>
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
                <li><a href="#">Salas</a></li>
                <li><a href="#">Especialidad</a></li>
                <li><a href="#">Objetos</a></li>
                <li><a href="#">Roles</a></li>
                <li><a href="#">Parámetros</a></li>
                <li><a href="#">Permisos</a></li>
              </ul>
            </li>
          </ul>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Buscar..." className={styles.searchBar_input} />
            <button className={styles.searchBar_button}>Buscar</button>
          </div>
        </nav>
      )}

      <Outlet />
    </div>
  );
}

export default Nav;
