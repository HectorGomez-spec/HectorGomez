import React from 'react'
import { useAppContext } from '../../context/AppContext'
import '../../styles/perfil.css'
import usuarioLogo from '../../Img/user.svg'
import alert1 from '../../Img/Alert1.png'
import regis from '../../Img/Regis.png'
import logo from '../../Img/logo.svg'
import reporte1 from '../../Img/reporte1.png'
import { useEffect } from 'react'


export function Perfil() {
  const {logout,user} = useAppContext();

  useEffect(() => {
    console.log(user);
  },[])

    return (
      <div className="App">
          <header>
              <div className="logo">
                  <img src={logo} alt="Logo" />
                  <h1>Sistema de Vigilancia Epidemiológica Y Control de Lavado de Manos</h1>
              </div>
              <div className="session-info">
                  <img src={usuarioLogo} alt="Usuario" />
                  <span>Usuario: {user[0][0].NOMBRE}</span>
                  <br />
                  <a href="#" onClick={()=>{
                      logout();
                  }} style={{ color: '#f8f9fa' }}>Cerrar Sesión</a>
              </div>
          </header>

          <nav id="main-nav">
              <ul>
                  <li><a href="/Pages/index.html">Inicio</a></li>
                  <li className="has-submenu"><a href="#">Pacientes</a></li>
                  <li className="has-submenu"><a href="salas.html">Salas</a></li>
                  <li className="has-submenu"><a href="#">Gestión</a></li>
                  <li className="has-submenu"><a href="#">Estadísticas</a></li>
                  <li className="has-submenu"><a href="#">Seguridad</a></li>
              </ul>
              <div className="search-bar">
                  <input type="text" placeholder="Buscar..." />
                  <button>Buscar</button>
              </div>
          </nav>

          {/* Submenús */}
          <nav id="submenu-nav-pacientes" style={{ display: 'none' }}>
              <ul>
                  <li><a href="verpacientes.html">Ver Pacientes</a></li>
                  <li><a href="registropaciente.html">Registrar Paciente</a></li>
              </ul>
          </nav>
          <nav id="submenu-nav-gestión" style={{ display: 'none' }}>
              <ul>
                  <li><a href="control_manos.html">Control Higiene de Manos</a></li>
                  <li><a href="vigilancia.html">Vigilancia Epidemiológica</a></li>
              </ul>
          </nav>
          <nav id="submenu-nav-estadísticas" style={{ display: 'none' }}>
              <ul>
                  <li><a href="estadística.html">Ver Estadísticas</a></li>
                  <li><a href="comparacion_estadística.html">Comparar Estadísticas</a></li>
              </ul>
          </nav>
          <nav id="submenu-nav-seguridad" style={{ display: 'none' }}>
              <ul>
                  <li><a href="usuarios.html">Usuarios</a></li>
                  <li><a href="roles.html">Roles</a></li>
                  <li><a href="permisos.html">Permisos</a></li>
              </ul>
          </nav>

          <main>
              <h2>Bienvenido al Sistema de Vigilancia Epidemiológica</h2>
              <p style={{ textAlign: 'justify' }}>
                  Aquí puedes gestionar y revisar los datos relacionados con la vigilancia epidemiológica.
              </p>
              <div className="actions">
                  <div className="action-card">
                      <h3>Registrar Nuevo Caso</h3>
                      <img src={regis} alt="Registro" className="square-image" />
                      <p>Registra nuevos casos y controla infecciones de forma rápida y eficiente.
                          Accede ahora y optimiza el seguimiento de pacientes hospitalizados.
                      </p>
                      <button onClick={() => handleRedirect('registropaciente.html')}>Registrar</button>
                  </div>
                  <div className="action-card">
                      <h3>Ver Alertas Activas</h3>
                      <img src={alert1} alt="Alerta" className="square-image" />
                      <p>¡Atención! <br />
                          Revisa las alertas activas y no pierdas de vista los casos más urgentes.
                          Mantén el control total de la situación en un solo clic.
                      </p>
                      <button onClick={() => handleRedirect('alertas.html')}>Ver Alertas</button>
                  </div>
                  <div className="action-card">
                      <h3>Generar Reporte</h3>
                      <img src={reporte1} alt="Alerta" className="bubble-image" />
                      <p>Genera reportes detallados en solo minutos.
                          Obtén estadísticas precisas y claras para tomar decisiones informadas.
                      </p>
                      <button onClick={() => handleRedirect('reporte.html')}>Generar</button>
                  </div>
              </div>
          </main>

          <footer>
              &copy; 2024 Sistema de Vigilancia Epidemiológica. Todos los derechos reservados.
          </footer>
      </div>
  );
}