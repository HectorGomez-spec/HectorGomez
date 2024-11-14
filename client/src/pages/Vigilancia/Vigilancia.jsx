import React from 'react';
import styles from '../../styles/Vigilancia.module.css'; // Importamos el archivo CSS que vamos a crear

function Vigilancia() {
  return (
    <div>

      <main>
        <h2>Vigilancia Epidemiológica</h2>
        <div className={styles.subtitles}>
          <div className={styles.dropdown_container}>
            <h4>Procedimiento Invasivo</h4>
            <select id="procedimiento_select">
              <option value="" disabled selected hidden>Seleccionar</option>
              <option value="CVC">Cateter Venoso Central</option>
              <option value="Urinario">Cateter Urinario</option>
              <option value="Periferico">Cateter Periférico</option>
            </select>
          </div>
        </div>

        <div className={styles.table_container}>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombre del paciente</th>
                <th>Edad</th>
                <th>Sala</th>
                <th>Habitación</th>
                <th>No. Visita</th>
                <th>Diagnóstico</th>
                <th>
                  <select id="infeccion_select">
                    <option value="" disabled selected hidden>Infecciones</option>
                    <option value="infeccion1">Inserción asociada a la atención sanitaria</option>
                    <option value="infeccion2">Neumonía asociada a ventilación mecánica</option>
                    <option value="infeccion3">Infección asociada a Inserción de sonda vesical</option>
                    <option value="infeccion4">Infección de heridas quirúrgicas</option>
                    <option value="infeccion5">Infección asociada por uso de catéter venoso central</option>
                  </select>
                </th>
                <th>Fecha de inicio</th>
                <th>Fecha Final</th>
                <th>Recuento de días</th>
                <th>Días EXP</th>
                <th>Cultivo Si/No</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr>
                <td>1</td>
                <td>Hector Gomez</td>
                <td>24</td>
                <td>Emergencia</td>
                <td>8898</td>
                <td>XXXX</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        <div className={styles.buttons_container}>
          <button className={styles.btn_modificar}>Modificar</button>
          <button className={styles.btn_eliminar}>Eliminar</button>
        </div>
      </main>

      <footer>
        &copy; 2024 Sistema de Vigilancia Epidemiológica. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Vigilancia;
