import React from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/perfil.css';
import alert1 from '../../Img/Alert1.png';
import regis from '../../Img/Regis.png';
import reporte1 from '../../Img/reporte1.png';
import { useEffect } from 'react';

export function Perfil() {
  const { logout, user } = useAppContext();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="App">
      <main className="perfil-background">
        <h2>Bienvenido al Sistema de Vigilancia Epidemiológica</h2>
        <p style={{ textAlign: 'justify' }}>
          Aquí puedes gestionar y revisar los datos relacionados con la vigilancia epidemiológica.
        </p>
        <div className="actions">
          <div className="action-card">
            <h3>Registrar Nuevo Caso</h3>
            <img src={regis} alt="Registro" className="square-image" />
            <p>
              Registra nuevos casos y controla infecciones de forma rápida y eficiente. Accede ahora y optimiza el
              seguimiento de pacientes hospitalizados.
            </p>
            <button onClick={() => handleRedirect('registropaciente.html')}>Registrar</button>
          </div>
          <div className="action-card">
            <h3>Ver Alertas Activas</h3>
            <img src={alert1} alt="Alerta" className="square-image" />
            <p>
              ¡Atención! <br />
              Revisa las alertas activas y no pierdas de vista los casos más urgentes. Mantén el control total de la
              situación en un solo clic.
            </p>
            <button onClick={() => handleRedirect('alertas.html')}>Ver Alertas</button>
          </div>
          <div className="action-card">
            <h3>Generar Reporte</h3>
            <img src={reporte1} alt="Alerta" className="bubble-image" />
            <p>
              Genera reportes detallados en solo minutos. Obtén estadísticas precisas y claras para tomar decisiones
              informadas.
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
