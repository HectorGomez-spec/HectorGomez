import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
import "../../styles/ReportePorFecha.css";

const ReportePorFecha = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reportData, setReportData] = useState([]);

  const handleGenerarReporte = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reporte/fechas", {
        params: { fechaInicio, fechaFin },
      });
      if (response.data.length === 0) {
        alert("No se encontraron datos en este rango de fechas.");
        setReportData([]);
      } else {
        setReportData(response.data);
      }
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("Hubo un problema al generar el reporte.");
    }
  };

  // Función para formatear fechas al formato DD/MM/YYYY
  const formatFecha = (fecha) => {
    const [year, month, day] = fecha.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const handleDescargarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Control de Higiene Por Fecha", 10, 10);

    doc.autoTable({
      head: [["ID", "Fecha", "Turno", "Área", "Usuario", "Observaciones"]],
      body: reportData.map((row) => [
        row.id,
        formatFecha(row.fecha), // Formatear la fecha a DD/MM/YYYY
        row.turno,
        row.area,
        row.usuario,
        row.observaciones,
      ]),
    });

    doc.save("reporte_higiene.pdf");
  };

  const handleDescargarExcel = () => {
    // Formatear los datos para Excel
    const formattedData = reportData.map((row) => ({
      ID: row.id,
      Fecha: formatFecha(row.fecha), // Formatear la fecha a DD/MM/YYYY
      Turno: row.turno,
      Área: row.area,
      Usuario: row.usuario,
      Observaciones: row.observaciones,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    XLSX.writeFile(workbook, "reporte_higiene.xlsx");
  };

  return (
    <div className="reportes-container">
      <h2>Generar Reporte Por Fecha</h2>
      <div>
        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </div>
      <div>
        <label>Fecha Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </div>
      <button onClick={handleGenerarReporte}>Generar Reporte</button>

      <h3>Resultados del Reporte</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Turno</th>
            <th>Área</th>
            <th>Usuario</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              {/* Formatear la fecha a DD/MM/YYYY */}
              <td>{formatFecha(row.fecha)}</td>
              <td>{row.turno}</td>
              <td>{row.area}</td>
              <td>{row.usuario}</td>
              <td>{row.observaciones}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones para descargar el reporte */}
      <div className="reporte-descargas">
        <button onClick={handleDescargarPDF}>Descargar PDF</button>
        <button onClick={handleDescargarExcel}>Descargar Excel</button>
      </div>
    </div>
  );
};

export default ReportePorFecha;
