import React from 'react';
import styles from '../../styles/ControlLavado.module.css'; // Importamos el archivo CSS que vamos a crear
import { useState } from 'react';

function ControlLavado() {
  const [cronometros, setCronometros] = useState({});
  
  const startCronometro = (id) => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      setCronometros(prevState => ({
        ...prevState,
        [id]: { time: `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`, interval }
      }));
    }, 1000);
  };

  const stopCronometro = (id, checkboxId) => {
    const { interval } = cronometros[id] || {};
    if (interval) {
      clearInterval(interval);
      setCronometros(prevState => {
        const newState = { ...prevState };
        newState[id] = { ...newState[id], time: "00:00" };
        return newState;
      });
      document.getElementById(checkboxId).checked = false;
    }
  };

  return (
    <div>

      <div className={styles.container}>
        <h2>Control de Higiene de Manos</h2>
        <div className={styles.formGroup}>
          <h3>Datos de Identificación</h3>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="mes">Mes</label>
              <select id="mes" required>
                <option value="" disabled selected>Selecciona Mes</option>
                {/* Add the options here */}
              </select>
            </div>
            <div className={styles.formField}>
              <label htmlFor="Año">Año</label>
              <input type="number" id="Año" placeholder="Ingresa Año" required />
            </div>
            <div className={styles.formField}>
              <label htmlFor="Turno">Turno</label>
              <select id="Turno" required>
                <option value="" disabled selected>Selecciona Turno</option>
                {/* Add the options here */}
              </select>
            </div>
            <div className={styles.formField}>
              <label htmlFor="Sesion">Sesion</label>
              <input type="text" id="Sesion" placeholder="Ingresa Sesion" required />
            </div>
            <div className={styles.formField}>
              <label htmlFor="Area">Area/Sala</label>
              <select id="Area" required>
                <option value="" disabled selected>Selecciona Area</option>
                {/* Add the options here */}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <h3>Profesional</h3>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario" placeholder="Ingresa Usuario" required />
            </div>
            <div className={styles.formField}>
              <label htmlFor="observacion">N° Observacion</label>
              <input type="text" id="observacion" placeholder="Ingresa observacion" required />
            </div>
            <div className={styles.formField}>
              <label htmlFor="sujeto">Sujeto Observado</label>
             <select name="" id="">
                <option value="1">1</option>
             </select>
            </div>
          </div>
        </div>

        {/* Indicaciones realizadas */}
        <div className={styles.indicacionesRealizadas}>
          <h3>Indicaciones Realizadas</h3>
          <ul className={styles.momentosLista}>
            {/* Momentos preexistentes */}
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="momento1" />
                <label htmlFor="momento1">Antes del contacto con el paciente</label>
              </div>
              <div className={styles.itemDetails}>
                <input type="text" className={styles.cronometro} readOnly value={cronometros.momento1?.time || "00:00"} />
                <button
                  className={styles.finalizarBtn}
                  onClick={() => stopCronometro("momento1", "momento1")}
                >
                  Finalizar
                </button>
                <input type="text" className={styles.tiempoGuardado} readOnly value={cronometros.momento1?.time || ""} />
                <select className={styles.accionSelect}>
                  <option value="">Acción</option>
                  <option value="Frotar">Frotar</option>
                  <option value="Lavar">Lavar</option>
                  <option value="Omitió">Omitió</option>
                </select>
              </div>
            </li>
            {/* Nueva sección añadida */}
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="momento4" onChange={() => {
                  if (document.getElementById("momento4").checked) startCronometro("momento4");
                  else stopCronometro("momento4", "momento4");
                }} />
                <label htmlFor="momento4">Después del contacto con el paciente</label>
              </div>
              <div className={styles.itemDetails}>
                <input type="text" className={styles.cronometro} readOnly value={cronometros.momento4?.time || "00:00"} />
                <button
                  className={styles.finalizarBtn}
                  onClick={() => stopCronometro("momento4", "momento4")}
                >
                  Finalizar
                </button>
                <input type="text" className={styles.tiempoGuardado} readOnly value={cronometros.momento4?.time || ""} />
                <select className={styles.accionSelect}>
                  <option value="">Acción</option>
                  <option value="Frotar">Frotar</option>
                  <option value="Lavar">Lavar</option>
                  <option value="Omitió">Omitió</option>
                </select>
              </div>
            </li>
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="momento5" onChange={() => {
                  if (document.getElementById("momento5").checked) startCronometro("momento5");
                  else stopCronometro("momento5", "momento5");
                }} />
                <label htmlFor="momento5">Después del contacto con el entorno del paciente</label>
              </div>
              <div className={styles.itemDetails}>
                <input type="text" className={styles.cronometro} readOnly value={cronometros.momento5?.time || "00:00"} />
                <button
                  className={styles.finalizarBtn}
                  onClick={() => stopCronometro("momento5", "momento5")}
                >
                  Finalizar
                </button>
                <input type="text" className={styles.tiempoGuardado} readOnly value={cronometros.momento5?.time || ""} />
                <select className={styles.accionSelect}>
                  <option value="">Acción</option>
                  <option value="Frotar">Frotar</option>
                  <option value="Lavar">Lavar</option>
                  <option value="Omitió">Omitió</option>
                </select>
              </div>
            </li>
            {/* Nueva sección añadida */}
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="momento4" onChange={() => {
                  if (document.getElementById("momento4").checked) startCronometro("momento4");
                  else stopCronometro("momento4", "momento4");
                }} />
                <label htmlFor="momento4">Después de la exposición con fluidos corporales</label>
              </div>
              <div className={styles.itemDetails}>
                <input type="text" className={styles.cronometro} readOnly value={cronometros.momento4?.time || "00:00"} />
                <button
                  className={styles.finalizarBtn}
                  onClick={() => stopCronometro("momento4", "momento4")}
                >
                  Finalizar
                </button>
                <input type="text" className={styles.tiempoGuardado} readOnly value={cronometros.momento4?.time || ""} />
                <select className={styles.accionSelect}>
                  <option value="">Acción</option>
                  <option value="Frotar">Frotar</option>
                  <option value="Lavar">Lavar</option>
                  <option value="Omitió">Omitió</option>
                </select>
              </div>
            </li>
            {/* Nueva sección añadida */}
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="momento4" onChange={() => {
                  if (document.getElementById("momento4").checked) startCronometro("momento4");
                  else stopCronometro("momento4", "momento4");
                }} />
                <label htmlFor="momento4">Antes de una tarea limpia o aséptica</label>
              </div>
              <div className={styles.itemDetails}>
                <input type="text" className={styles.cronometro} readOnly value={cronometros.momento4?.time || "00:00"} />
                <button
                  className={styles.finalizarBtn}
                  onClick={() => stopCronometro("momento4", "momento4")}
                >
                  Finalizar
                </button>
                <input type="text" className={styles.tiempoGuardado} readOnly value={cronometros.momento4?.time || ""} />
                <select className={styles.accionSelect}>
                  <option value="">Acción</option>
                  <option value="Frotar">Frotar</option>
                  <option value="Lavar">Lavar</option>
                  <option value="Omitió">Omitió</option>
                </select>
              </div>
            </li>
          </ul>
        </div>

        {/* Sección de accesorios */}
        <div className={styles.accesorios}>
          <h3>Accesorios</h3>
          <ul>
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="accesorio1" />
                <label htmlFor="accesorio1">Anillos</label>
              </div>
            </li>
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="accesorio2" />
                <label htmlFor="accesorio2">Brazalete/Reloj</label>
              </div>
            </li>
            <li>
              <div className={styles.itemHeader}>
                <input type="checkbox" id="accesorio3" />
                <label htmlFor="accesorio3">Uñas largas</label>
              </div>
            </li>
          </ul>
        </div>

        {/* Botón para guardar */}
        <div className={styles.formActions}>
          <button type="submit">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ControlLavado;