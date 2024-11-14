import React from 'react';
import styles from '../../styles/SalaOncologia.module.css'; // Importamos el archivo CSS que vamos a crear


function SalaOncologia() {
  return (
    <div>
     
      <main>
        <section className={styles.section_description}>
          <div className={styles.section_title}>
            <h2>Sala Oncológica</h2>
          </div>
          <div className={styles.section_content}>
            <p>La sala oncológica está diseñada para proporcionar cuidados especializados a pacientes con cáncer. Aquí, se monitorean cuidadosamente los dispositivos médicos utilizados y se gestionan los datos clínicos de los pacientes para asegurar un tratamiento eficaz y seguro. La sala cuenta con equipos avanzados y un personal capacitado para atender las necesidades específicas de cada paciente.</p>
          </div>
        </section>

        <section className={styles.section_patient_info}>
          <div className={styles.section_title}>
            <h2>Información de Pacientes</h2>
          </div>
          <div className={styles.section_content}>
            <table>
              <thead>
                <tr>
                  <th>ID Paciente</th>
                  <th>Nombre</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Edad</th>
                  <th>Número de Visita</th>
                  <th>Número de Cama</th>
                  <th>Fecha de Ingreso</th>
                  <th>Dispositivo</th>
                  <th>Fecha Inicial</th>
                  <th>Fecha Final</th>
                  <th>Días de Uso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>Juan Pérez</td>
                  <td>1980-05-15</td>
                  <td>44</td>
                  <td>12345</td>
                  <td>12</td>
                  <td>2024-07-28</td>
                  <td>Catéter Venoso</td>
                  <td>2024-08-01</td>
                  <td>2024-08-10</td>
                  <td>10</td>
                  <td className={styles.actions}>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Blanca Mesa</td>
                  <td>1989-07-20</td>
                  <td>35</td>
                  <td>13544</td>
                  <td>10</td>
                  <td>2024-08-25</td>
                  <td>Catéter Central</td>
                  <td>2024-09-01</td>
                  <td>2024-09-15</td>
                  <td>15</td>
                  <td className={styles.actions}>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section_device_monitoring}>
          <div className={styles.section_title}>
            <h2>Vigilancia de Dispositivos</h2>
          </div>
          <div className={styles.section_content}>
            <ul>
              <li><strong>Catéter Venoso:</strong> Utilizado por 5 pacientes, promedio de 10 días de uso.</li>
              <li><strong>Ventilación Mecánica:</strong> Utilizada por 4 pacientes, promedio de 9 días de uso.</li>
              <li><strong>Catéter Urinario:</strong> Utilizado por 3 pacientes, promedio de 11 días de uso.</li>
            </ul>
          </div>
        </section>

        <section className={styles.section_infections}>
          <div className={styles.section_title}>
            <h2>Infecciones Presentadas</h2>
          </div>
          <div className={styles.section_content}>
            <ul>
              <li><strong>Juan Pérez:</strong> Infección por Catéter Venoso, diagnosticada el 2024-08-05.</li>
              <li><strong>Ana Fernández:</strong> Infección por Catéter Urinario, diagnosticada el 2024-08-12.</li>
            </ul>
          </div>
        </section>

        <section className={styles.section_discharge_soon}>
          <div className={styles.section_title}>
            <h2>Pacientes a Dar de Alta en los Próximos 5 Días</h2>
          </div>
          <div className={styles.section_content}>
            <table>
              <thead>
                <tr>
                  <th>ID Paciente</th>
                  <th>Nombre</th>
                  <th>Fecha de Salida</th>
                  <th>Días de Uso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>005</td>
                  <td>José López</td>
                  <td>2024-08-18</td>
                  <td>9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section_upcoming_procedures}>
          <div className={styles.section_title}>
            <h2>Procedimientos Próximos</h2>
          </div>
          <div className={styles.section_content}>
            <table>
              <thead>
                <tr>
                  <th>ID Paciente</th>
                  <th>Nombre</th>
                  <th>Procedimiento</th>
                  <th>Fecha del Procedimiento</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>003</td>
                  <td>Pedro Martínez</td>
                  <td>Quimioterapia</td>
                  <td>2024-08-25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <button className={styles.update_button}>Descargar</button>
        <button className={styles.update_button}>Imprimir</button>
      </main>
    </div>
  );
}

export default SalaOncologia;
