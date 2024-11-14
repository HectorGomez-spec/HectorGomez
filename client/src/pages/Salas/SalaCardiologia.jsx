import React from 'react';
import styles from '../../styles/SalaCardiologia.module.css'; // Importamos el archivo CSS que vamos a crear


function SalaCardiologia() {
  return (
    <div>
      
      <main>
        <section className={styles.section_description}>
          <div className={styles.section_title}>
            <h2>Sala de Cardiología</h2>
          </div>
          <div className={styles.section_content}>
            <p>La sala de cardiología está equipada para proporcionar atención especializada a pacientes con enfermedades cardiovasculares...</p>
          </div>
        </section>

        <section className={styles.section_patient_monitoring}>
          <div className={styles.section_title}>
            <h2>Monitoreo de Pacientes</h2>
          </div>
          <div className={styles.section_content}>
            <table>
              <thead>
                <tr>
                  <th>ID Paciente</th>
                  <th>Nombre</th>
                  <th>Diagnóstico</th>
                  <th>Dispositivo</th>
                  <th>Fecha de Ingreso</th>
                  <th>Última Medición</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>María López</td>
                  <td>Insuficiencia Cardíaca</td>
                  <td>Marcapasos</td>
                  <td>2024-08-10</td>
                  <td>2024-08-21</td>
                  <td>Estable</td>
                  <td className={styles.actions}>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </td>
                </tr>
                {/* Añadir más pacientes aquí */}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section_device_usage}>
          <div className={styles.section_title}>
            <h2>Uso de Dispositivos</h2>
          </div>
          <div className={styles.section_content}>
            <table>
              <thead>
                <tr>
                  <th>Dispositivo</th>
                  <th>Pacientes en Uso</th>
                  <th>Promedio de Uso (días)</th>
                  <th>Último Mantenimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Marcapasos</td>
                  <td>12</td>
                  <td>75</td>
                  <td>2024-07-15</td>
                  <td>Operativo</td>
                </tr>
                <tr>
                  <td>Monitor de Presión</td>
                  <td>8</td>
                  <td>30</td>
                  <td>2024-08-01</td>
                  <td>Operativo</td>
                </tr>
                {/* Añadir más dispositivos aquí */}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section_epidemiological_reports}>
          <div className={styles.section_title}>
            <h2>Reportes Epidemiológicos</h2>
          </div>
          <div className={styles.section_content}>
            <ul>
              <li><strong>Incidencia de Infecciones Cardiovasculares:</strong> Número de casos reportados en los últimos 30 días.</li>
              <li><strong>Prevalencia de Enfermedades Cardiovasculares:</strong> Datos estadísticos de prevalencia entre pacientes actuales.</li>
              <li><strong>Monitoreo de Uso de Dispositivos:</strong> Estadísticas de uso y mantenimiento de dispositivos cardiológicos.</li>
            </ul>
          </div>
        </section>

        <section className={styles.section_upcoming_appointments}>
          <div className={styles.section_title}>
            <h2>Citas Próximas</h2>
          </div>
          <div className={styles.section_content}>
            <table>
              <thead>
                <tr>
                  <th>ID Paciente</th>
                  <th>Nombre</th>
                  <th>Fecha de Cita</th>
                  <th>Hora</th>
                  <th>Motivo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>002</td>
                  <td>Carmen García</td>
                  <td>2024-08-25</td>
                  <td>10:00 AM</td>
                  <td>Revisión de Dispositivo</td>
                </tr>
                {/* Añadir más citas aquí */}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; 2024 Sistema de Vigilancia Epidemiológica. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default SalaCardiologia;

