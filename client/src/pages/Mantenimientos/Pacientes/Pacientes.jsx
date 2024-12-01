import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Importa jsPDF
import "../../../styles/Paciente.css";

function Paciente() {
  // Estados para el formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("masculino");
  const [habitacion, setHabitacion] = useState("");
  const [visita, setVisita] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [diasHospitalizados, setDiasHospitalizados] = useState("");
  const [sala, setSala] = useState("Hospitalización 5to piso");
  const [infeccion, setInfeccion] = useState("infeccion1");
  const [procedimiento, setProcedimiento] = useState("procedimiento1");
  const [dispositivos, setDispositivos] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [dispositivoOtroHospital, setDispositivoOtroHospital] = useState(false);
  const [error, setError] = useState(""); // Para mensajes de error
  const [mensaje, setMensaje] = useState(""); // Para mensajes de éxito

  // Estado para la lista de pacientes
  const [pacientes, setPacientes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editPacienteId, setEditPacienteId] = useState(null);
  // Mapas de infecciones y procedimientos
  const infeccionesMap = {
    infeccion1: "Infecciones asociadas a la atención sanitaria",
    infeccion2: "Infecciones asociadas a la ventilación mecánica",
    infeccion3: "Infecciones asociadas a inserción de sonda vesical",
    infeccion4: "Infecciones asociadas a uso de catéter venoso central",
    infeccion5: "Infecciones de heridas quirúrgicas",
  };

  const procedimientosMap = {
    procedimiento1: "Herida Quirúrgica por ventilación",
    procedimiento2: "Catéter Venoso Central",
    procedimiento3: "Catéter Urinario",
    procedimiento4: "Catéter Periférico",
  };
  const filteredPacientes = pacientes.filter((paciente) => {
    return Object.values(paciente)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleEdit = (id) => {
    setEditPacienteId(id);
    const paciente = pacientes.find((p) => p.id === id);
    if (paciente) {
      setNombre(paciente.nombre);
      setEdad(paciente.edad);
      setGenero(paciente.genero);
      setHabitacion(paciente.habitacion);
      setVisita(paciente.visita);
      setDiagnostico(paciente.diagnostico);
      setFechaRegistro(paciente.fecha_registro);
      setFechaAlta(paciente.fecha_alta);
      setSala(paciente.sala);
      setInfeccion(paciente.infeccion);
      setProcedimiento(paciente.procedimiento);
      setDispositivos(paciente.cantidad_dispositivos);
      setObservaciones(paciente.observaciones);
      setDispositivoOtroHospital(paciente.dispositivo_otro_hospital);
    }
  };
  const handleUpdate = async () => {
    const data = {
        nombre,
        edad,
        genero,
        habitacion,
        visita,
        diagnostico,
        fecha_registro: fechaRegistro,
        fecha_alta: fechaAlta,
        dias_hospitalizados: diasHospitalizados,
        sala,
        infeccion,
        procedimiento,
        cantidad_dispositivos: dispositivos,
        observaciones,
        dispositivo_otro_hospital: dispositivoOtroHospital,
    };

    try {
        const response = await fetch(
            `http://localhost:3000/api/pacientes/${editPacienteId}`, // ID en el URL
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // Sin el campo "id"
            }
        );

        if (response.ok) {
            setMensaje("Paciente actualizado correctamente");
            obtenerPacientes();
            resetForm();
            setEditPacienteId(null);
        } else {
            const errorResponse = await response.json();
            console.error("Error en el servidor:", errorResponse);
            setError("Error al actualizar el paciente");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setError("Error al conectar con el servidor");
    }
};

  const generatePDF = (paciente) => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Información del Paciente", 20, 20);

    // Contenido del PDF
    doc.setFontSize(12);
    doc.text(`Nombre: ${paciente.nombre}`, 20, 50);
    doc.text(`Edad: ${paciente.edad}`, 20, 60);
    doc.text(`Género: ${paciente.genero}`, 20, 70);
    doc.text(`Habitación: ${paciente.habitacion}`, 20, 80);
    doc.text(`Visita: ${paciente.visita}`, 20, 90);
    doc.text(`Diagnóstico: ${paciente.diagnostico}`, 20, 100);
    doc.text(
      `Fecha de Registro: ${new Date(paciente.fecha_registro).toLocaleDateString()}`,
      20,
      110
    );
    doc.text(
      `Fecha de Alta: ${
        paciente.fecha_alta
          ? new Date(paciente.fecha_alta).toLocaleDateString()
          : "N/A"
      }`,
      20,
      120
    );
    doc.text(`Días Hospitalizados: ${paciente.dias_hospitalizados || "N/A"}`, 20, 130);
    doc.text(`Sala: ${paciente.sala}`, 20, 140);
    doc.text(
      `Infección: ${infeccionesMap[paciente.infeccion] || "Sin especificar"}`,
      20,
      150
    );
    doc.text(
      `Procedimiento: ${
        procedimientosMap[paciente.procedimiento] || "Sin especificar"
      }`,
      20,
      160
    );
    doc.text(
      `Cantidad de Dispositivos: ${paciente.cantidad_dispositivos}`,
      20,
      170
    );
    doc.text(
      `Observaciones: ${paciente.observaciones || "Sin observaciones"}`,
      20,
      180
    );
    doc.text(
      `Dispositivo de Otro Hospital: ${
        paciente.dispositivo_otro_hospital ? "Sí" : "No"
      }`,
      20,
      190
    );

    // Guardar el PDF
    doc.save(`Paciente_${paciente.nombre}_${paciente.id}.pdf`);
  };
  const generateFullListPDF = () => {
    const doc = new jsPDF();
  
    // Título
    doc.setFontSize(18);
    doc.text("Lista de Pacientes Registrados", 20, 20);
  
    // Configuración inicial
    let yOffset = 30; // Margen inicial
    const pageHeight = doc.internal.pageSize.height; // Altura de la página
    const lineHeight = 10; // Altura de cada línea
    const patientBlockHeight = 150; // Altura aproximada que ocupa cada paciente
  
    // Iterar sobre la lista de pacientes
    pacientes.forEach((paciente, index) => {
      // Verificar si necesitamos una nueva página antes de agregar un nuevo paciente
      if (yOffset + patientBlockHeight > pageHeight) {
        doc.addPage(); // Agregar nueva página
        yOffset = 20; // Reiniciar el margen superior
      }
  
      // Agregar información del paciente
      doc.setFontSize(14);
      doc.text(`Paciente ${index + 1}`, 20, yOffset);
      yOffset += lineHeight;
  
      doc.setFontSize(12);
      doc.text(`ID: ${paciente.id}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Nombre: ${paciente.nombre}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Edad: ${paciente.edad}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Género: ${paciente.genero}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Habitación: ${paciente.habitacion}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Visita: ${paciente.visita}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Diagnóstico: ${paciente.diagnostico}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(
        `Fecha de Registro: ${new Date(
          paciente.fecha_registro
        ).toLocaleDateString()}`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Fecha de Alta: ${
          paciente.fecha_alta
            ? new Date(paciente.fecha_alta).toLocaleDateString()
            : "N/A"
        }`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Días Hospitalizados: ${paciente.dias_hospitalizados || "N/A"}`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(`Sala: ${paciente.sala}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(
        `Infección: ${infeccionesMap[paciente.infeccion] || "Sin especificar"}`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Procedimiento: ${
          procedimientosMap[paciente.procedimiento] || "Sin especificar"
        }`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Cantidad de Dispositivos: ${paciente.cantidad_dispositivos}`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Observaciones: ${paciente.observaciones || "Sin observaciones"}`,
        20,
        yOffset
      );
      yOffset += lineHeight;
      doc.text(
        `Dispositivo de Otro Hospital: ${
          paciente.dispositivo_otro_hospital ? "Sí" : "No"
        }`,
        20,
        yOffset
      );
  
      // Incrementar el margen para separar pacientes
      yOffset += lineHeight * 2;
    });
  
    // Guardar el PDF
    doc.save("Lista_Pacientes.pdf");
  };
  // Función para calcular los días hospitalizados
  const calcularDias = () => {
    if (fechaRegistro && fechaAlta) {
      const registro = new Date(fechaRegistro + "T00:00:00");
      const alta = new Date(fechaAlta + "T00:00:00");

      if (alta < registro) {
        setError("La fecha de alta no puede ser anterior a la fecha de registro.");
        setDiasHospitalizados("");
        return;
      }

      const diferencia = Math.ceil((alta - registro) / (1000 * 60 * 60 * 24));
      setDiasHospitalizados(diferencia >= 0 ? diferencia : 0);
      setError(""); // Limpiar errores si todo está correcto
    } else {
      setDiasHospitalizados("");
    }
  };

  // Recalcular automáticamente cuando cambien las fechas
  useEffect(() => {
    calcularDias();
  }, [fechaRegistro, fechaAlta]);

  // Función para obtener los pacientes
  const obtenerPacientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/pacientes");
      if (response.ok) {
        const data = await response.json();
        console.log("Datos de pacientes:", data); // Para depuración
        setPacientes(data);
      } else {
        console.error("Error al obtener los pacientes");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
    }
  };

  // useEffect para obtener los pacientes al montar el componente
  useEffect(() => {
    obtenerPacientes();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación final antes de enviar
    if (!fechaRegistro) {
      setError("La fecha de registro es obligatoria.");
      return;
    }

    if (
      fechaAlta &&
      new Date(fechaAlta + "T00:00:00") < new Date(fechaRegistro + "T00:00:00")
    ) {
      setError("La fecha de alta no puede ser anterior a la fecha de registro.");
      return;
    }

    // Datos del formulario para enviar
    const data = {
      nombre,
      edad,
      genero,
      habitacion,
      visita,
      diagnostico,
      fecha_registro: fechaRegistro,
      fecha_alta: fechaAlta || null,
      dias_hospitalizados: diasHospitalizados || null,
      sala,
      infeccion,
      procedimiento,
      cantidad_dispositivos: dispositivos,
      observaciones,
      dispositivo_otro_hospital: dispositivoOtroHospital,
    };

    try {
      const response = await fetch("http://localhost:3000/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMensaje("Paciente registrado correctamente");
        setError("");
        resetForm(); // Limpiar el formulario
        obtenerPacientes(); // Actualizar la lista de pacientes
      } else {
        setError("Error al registrar el paciente");
      }
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor");
    }
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setNombre("");
    setEdad("");
    setGenero("masculino");
    setHabitacion("");
    setVisita("");
    setDiagnostico("");
    setFechaRegistro("");
    setFechaAlta("");
    setDiasHospitalizados("");
    setSala("Hospitalización 5to piso");
    setInfeccion("infeccion1");
    setProcedimiento("procedimiento1");
    setDispositivos(0);
    setObservaciones("");
    setDispositivoOtroHospital(false);
  };

  return (
    <div>
      <main>
      <form onSubmit={editPacienteId ? handleUpdate : handleSubmit}>
      <h2>Registro de Pacientes</h2>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <div className="form-group">             
                <label htmlFor="nombre">Nombre del Paciente:</label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad:</label>
                <input
                  type="number"
                  id="edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="genero">Género:</label>
                <select
                  id="genero"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                >
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="habitacion">Habitación:</label>
                <input
                  type="text"
                  id="habitacion"
                  value={habitacion}
                  onChange={(e) => setHabitacion(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="visita">Número de Visita:</label>
                <input
                  type="text"
                  id="visita"
                  value={visita}
                  onChange={(e) => setVisita(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="diagnostico">Diagnóstico:</label>
                <input
                  type="text"
                  id="diagnostico"
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  required
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="form-group">
                <label htmlFor="fechaRegistro">Fecha de Registro:</label>
                <input
                  type="date"
                  id="fechaRegistro"
                  value={fechaRegistro}
                  onChange={(e) => setFechaRegistro(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaAlta">Fecha de Alta (Opcional):</label>
                <input
                  type="date"
                  id="fechaAlta"
                  value={fechaAlta}
                  onChange={(e) => setFechaAlta(e.target.value)}
                />
                {error && (
                  <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
                    {error}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dias_hospitalizado">Días Hospitalizados:</label>
                <input
                  type="text"
                  id="dias_hospitalizado"
                  value={diasHospitalizados || "En tratamiento"}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="sala">Sala:</label>
                <select
                  id="sala"
                  value={sala}
                  onChange={(e) => setSala(e.target.value)}
                  required
                >
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
              <div className="form-group">
                <label htmlFor="infeccion">Infección:</label>
                <select
                  id="infeccion"
                  value={infeccion}
                  onChange={(e) => setInfeccion(e.target.value)}
                  required
                >
                  <option value="infeccion1">
                    Infecciones asociadas a la atención sanitaria
                  </option>
                  <option value="infeccion2">
                    Infecciones asociadas a la ventilación mecánica
                  </option>
                  <option value="infeccion3">
                    Infecciones asociadas a inserción de sonda vesical
                  </option>
                  <option value="infeccion4">
                    Infecciones asociadas a uso de catéter venoso central
                  </option>
                  <option value="infeccion5">
                    Infecciones de heridas quirúrgicas
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="procedimiento">Procedimiento:</label>
                <select
                  id="procedimiento"
                  value={procedimiento}
                  onChange={(e) => setProcedimiento(e.target.value)}
                  required
                >
                  <option value="procedimiento1">
                    Herida Quirúrgica por ventilación
                  </option>
                  <option value="procedimiento2">Catéter Venoso Central</option>
                  <option value="procedimiento3">Catéter Urinario</option>
                  <option value="procedimiento4">Catéter Periférico</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dispositivos">Cantidad de Dispositivos:</label>
                <input
                  type="number"
                  id="dispositivos"
                  value={dispositivos}
                  onChange={(e) => setDispositivos(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="observaciones">Observaciones:</label>
                <textarea
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows="4"
                ></textarea>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={dispositivoOtroHospital}
                    onChange={(e) => setDispositivoOtroHospital(e.target.checked)}
                  />{" "}
                  Paciente venía con un dispositivo de otro hospital
                </label>
              </div>
            </div>
          </div>

          {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-actions">
            <button type="submit">Registrar</button>
          </div>
        </form>

{/* Mostrar la lista de pacientes */}
{pacientes.length > 0 ? (
  <div className="patient-list-container">
    <div className="table-container">
    <h2>Lista de Pacientes Registrados</h2>
    {/* Filtro dinámico */}
    <div>
            <label htmlFor="search">Buscar:</label>
            <input
              type="text"
              id="search"
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
          <button
            className="download-all-btn"
            onClick={generateFullListPDF}
          >
            Descargar Lista Completa en PDF
          </button>
        </div>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Habitación</th>
            <th>Visita</th>
            <th>Diagnóstico</th>
            <th>Fecha Registro</th>
            <th>Fecha Alta</th>
            <th>Días Hospitalizados</th>
            <th>Sala</th>
            <th>Infección</th>
            <th>Procedimiento</th>
            <th>Cant. Dispositivos</th>
            <th>Observaciones</th>
            <th>Dispositivo de Otro Hospital</th>
          </tr>
        </thead>
        <tbody>
  {filteredPacientes.map((paciente) => (
    
    <tr key={paciente.id}>
      <td>
        <button className="edit-btn" onClick={() => handleEdit(paciente.id)}>Editar</button>
        <button className="download-btn" onClick={() => generatePDF(paciente)}> Descargar PDF</button>
      </td>
      <td>{paciente.id}</td>
      <td>{paciente.nombre}</td>
      <td>{paciente.edad}</td>
      <td>{paciente.genero}</td>
      <td>{paciente.habitacion}</td>
      <td>{paciente.visita}</td>
      <td>{paciente.diagnostico}</td>
      <td>{new Date(paciente.fecha_registro).toLocaleDateString()}</td>
      <td>
        {paciente.fecha_alta
          ? new Date(paciente.fecha_alta).toLocaleDateString()
          : "N/A"}
      </td>
      <td>{paciente.dias_hospitalizados || "En tratamiento"}</td>
      <td>{paciente.sala}</td>
      <td>{infeccionesMap[paciente.infeccion] || "Sin especificar"}</td>
      <td>{procedimientosMap[paciente.procedimiento] || "Sin especificar"}</td>
      <td>{paciente.cantidad_dispositivos}</td>
      <td>{paciente.observaciones || "Sin observaciones"}</td>
      <td>{paciente.dispositivo_otro_hospital ? "Sí" : "No"}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  </div>
) : (
  <p>No hay pacientes registrados.</p>
)}

      </main>
    </div>
  );
}

export default Paciente;
