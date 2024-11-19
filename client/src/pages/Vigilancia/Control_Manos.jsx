import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ControlHigieneDeManos.css";

const ControlHigieneDeManos = () => {
  const [fecha, setFecha] = useState("");
  const [turno, setTurno] = useState("");
  const [area, setArea] = useState("");
  const [usuario, setUsuario] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [sujetoObservado, setSujetoObservado] = useState("");
  const [momentos, setMomentos] = useState([
    { tiempo: "00:00", tiempoGuardado: "", accion: "", label: "Antes del contacto con el paciente" },
    { tiempo: "00:00", tiempoGuardado: "", accion: "", label: "Antes de una tarea limpia o aséptica" },
    { tiempo: "00:00", tiempoGuardado: "", accion: "", label: "Después de la exposición con fluidos corporales" },
    { tiempo: "00:00", tiempoGuardado: "", accion: "", label: "Después del contacto con el paciente" },
    { tiempo: "00:00", tiempoGuardado: "", accion: "", label: "Después del contacto con el entorno del paciente" },
  ]);

  const [intervals, setIntervals] = useState({});
  const [accesorios, setAccesorios] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setFecha(formattedDate);
  }, []);

  const handleAccesoriosChange = (event) => {
    const { id, checked } = event.target;
    setAccesorios((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleFocus = (index) => {
    if (intervals[index]?.interval) {
      clearInterval(intervals[index].interval);
      setIntervals((prev) => ({ ...prev, [index]: null }));
    } else {
      const newInterval = startCronometro(index);
      setIntervals((prev) => ({ ...prev, [index]: newInterval }));
    }
  };

  const startCronometro = (index) => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      setMomentos((prev) => {
        const updatedMomentos = [...prev];
        updatedMomentos[index] = { ...updatedMomentos[index], tiempo: `${minutes}:${secs}` };
        return updatedMomentos;
      });
    }, 1000);

    return { interval };
  };

  const handleFinalizar = (index) => {
    if (intervals[index]?.interval) {
      clearInterval(intervals[index].interval);
      setIntervals((prev) => ({ ...prev, [index]: null }));
      setMomentos((prev) => {
        const updatedMomentos = [...prev];
        updatedMomentos[index] = {
          ...updatedMomentos[index],
          tiempoGuardado: updatedMomentos[index].tiempo,
          tiempo: "00:00",
        };
        return updatedMomentos;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formatear la fecha para que coincida con las expectativas del backend (ajustada a la zona horaria local)
    const now = new Date();
    const formattedFecha = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]; // Formato: YYYY-MM-DD

    const data = {
        fecha: formattedFecha, // Usa la fecha formateada
        turno,
        area,
        usuario,
        sujeto_observado: sujetoObservado,
        observaciones,
        momentos,
        accesorios,
    };

    try {
        const response = await axios.post("http://localhost:3000/api/crearControl", data);
        if (response.status === 201) {
            alert("Registro guardado correctamente.");
            // Reiniciar los campos del formulario
            setTurno("");
            setArea("");
            setUsuario("");
            setObservaciones("");
            setSujetoObservado("");
            setMomentos(
                momentos.map((momento) => ({ ...momento, tiempo: "00:00", accion: "" }))
            );
            setAccesorios([]);
        }
    } catch (error) {
        console.error("Error al guardar el registro:", error);
        alert("Hubo un problema al guardar los datos.");
    }
};



  return (
    <div className="container">
      <h2>Control de Higiene de Manos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h3>Datos de Identificación</h3>
          <div className="form-row">
            <div>
              <label htmlFor="fecha">Fecha</label>
              <input type="text" id="fecha" value={fecha} readOnly />
            </div>
            <div>
              <label htmlFor="turno">Turno</label>
              <select id="turno" value={turno} onChange={(e) => setTurno(e.target.value)} required>
                <option value="" disabled>Selecciona Turno</option>
                <option>Mañana</option>
                <option>Tarde</option>
                <option>Noche</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <label htmlFor="area">Área/Sala</label>
              <select id="area" value={area} onChange={(e) => setArea(e.target.value)} required>
                <option value="" disabled>Selecciona Área/Sala</option>
                <option>Hospitalización 5to piso</option>
                <option>Hospitalización 2do piso</option>
                <option>UCIN</option>
                <option>UCIA</option>
                <option>UCI</option>
                <option>Endoscopía</option>
                <option>Quirófano</option>
                <option>Oncología</option>
                <option>Maternidad</option>
                <option>Sala Cuna</option>
                <option>Pediatría</option>
                <option>Emergencia</option>
                <option>Radiología</option>
                <option>Laboratorio</option>
                <option>Centro Cardiovascular</option>
                <option>Rehabilitación</option>
                <option>Fonoaudiología</option>
                <option>Hemodiálisis</option>
                <option>Radiología Intervencionista</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <h3>Profesional</h3>
          <div className="form-row">
            <div>
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingresa Usuario"
                required
              />
            </div>
            <div>
              <label htmlFor="sujeto-observado">Sujeto Observado</label>
              <select
                id="sujeto-observado"
                value={sujetoObservado}
                onChange={(e) => setSujetoObservado(e.target.value)}
                required
              >
                <option value="" disabled>Selecciona Especialidad</option>
                <option>Medico</option>
                <option>Enfermeria</option>
                <option>Auxiliar Enfermeria</option>
                <option>Ayudante Enfermeria</option>
                <option>Tenico Radiologia</option>
                <option>Tenico Fisioterapia</option>
                <option>Tenico de Laboratorio</option>
                <option>Nutricionista</option>
                <option>Microbiologo</option>
                <option>Intrumentista</option>
                <option>Auxiliar de dietas</option>
                <option>Circulante</option>
              </select>
            </div>
          </div>
        </div>
        <div className="indicaciones-realizadas">
          <h3>Indicaciones Realizadas</h3>
          <ul className="momentos-lista">
            {momentos.map((momento, index) => (
              <li key={index}>
                <div className="item-header">
                  <label>{momento.label}</label>
                </div>
                <div className="item-details">
                  <input
                    type="text"
                    className="cronometro"
                    readOnly
                    value={momento.tiempo}
                    placeholder="00:00"
                    onFocus={() => handleFocus(index)}
                  />
                  <button
                    type="button"
                    className="finalizar-btn"
                    onClick={() => handleFinalizar(index)}
                  >
                    Finalizar
                  </button>
                  <input
                    type="text"
                    className="tiempo-guardado"
                    readOnly
                    value={momento.tiempoGuardado}
                    placeholder="Tiempo guardado"
                  />
                  <select
                    className="accion-select"
                    value={momento.accion}
                    onChange={(e) =>
                      setMomentos((prev) => {
                        const updatedMomentos = [...prev];
                        updatedMomentos[index].accion = e.target.value;
                        return updatedMomentos;
                      })
                    }
                  >
                    <option value="">Acción</option>
                    <option value="Frotar">Frotar</option>
                    <option value="Lavar">Lavar</option>
                    <option value="Omitió">Omitió</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="observaciones">
          <h3>Observaciones</h3>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Escribe aquí tus observaciones..."
            rows="5"
            cols="50"
          ></textarea>
        </div>
        <div className="accesorios">
        <h3>Accesorios</h3>
        <ul>
          <li>
            <div className="itemHeader">
              <input
                type="checkbox"
                id="Anillos"
                onChange={handleAccesoriosChange}
                checked={accesorios.includes("Anillos")} // Mantén la selección dinámica
              />
              <label htmlFor="Anillos">Anillos</label>
            </div>
          </li>
          <li>
            <div className="itemHeader">
              <input
                type="checkbox"
                id="Brazalete/Reloj"
                onChange={handleAccesoriosChange}
                checked={accesorios.includes("Brazalete/Reloj")} // Mantén la selección dinámica
              />
              <label htmlFor="Brazalete/Reloj">Brazalete/Reloj</label>
            </div>
          </li>
          <li>
            <div className="itemHeader">
              <input
                type="checkbox"
                id="Uñas largas"
                onChange={handleAccesoriosChange}
                checked={accesorios.includes("Uñas largas")} // Mantén la selección dinámica
              />
              <label htmlFor="Uñas largas">Uñas largas</label>
            </div>
          </li>
        </ul>
      </div>

        <div className="form-actions">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
};

export default ControlHigieneDeManos;
