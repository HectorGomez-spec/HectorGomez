import { pool } from "../../database/conexion.js";
export const getReportePorFechas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;
  
    try {
      const [rows] = await pool.query(
        `SELECT id, fecha, turno, area, usuario, observaciones 
         FROM control_higiene_de_manos 
         WHERE DATE(fecha) BETWEEN ? AND ? 
         ORDER BY fecha ASC`,
        [fechaInicio, fechaFin]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "No se encontraron datos en este rango de fechas." });
      }
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el reporte" });
    }
  };
export const getEstadisticas = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                JSON_UNQUOTE(JSON_EXTRACT(momento, '$.accion')) AS accion, 
                COUNT(*) AS cantidad
            FROM (
                SELECT JSON_EXTRACT(momentos, '$[*]') AS momento
                FROM control_higiene_de_manos
            ) AS momentos_expandido
            WHERE accion IS NOT NULL
            GROUP BY accion
        `);

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener estadísticas" });
    }
};
