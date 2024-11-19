import { pool } from "../../database/conexion.js";

// Obtener todos los registros
export const getControles = async (req, res) => {
    try {
        const [response] = await pool.query(`
            SELECT 
                id,
                fecha,
                turno,
                area,
                usuario,
                sujeto_observado,
                observaciones,
                JSON_PRETTY(momentos) AS momentos,
                JSON_PRETTY(accesorios) AS accesorios,
                created_at
            FROM control_higiene_de_manos
        `);

        // Opcional: Si necesitas manipular los datos como objetos JSON en el backend
        const formattedResponse = response.map(row => ({
            ...row,
            momentos: JSON.parse(row.momentos || "[]"),
            accesorios: JSON.parse(row.accesorios || "[]"),
        }));

        return res.status(200).json(formattedResponse);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error al obtener los registros');
    }
};


// Crear un nuevo registro
export const crearControl = async (req, res) => {
    const { fecha, turno, area, usuario, sujeto_observado, observaciones, momentos, accesorios } = req.body;

    try {
        // Validar y formatear la fecha
        const formattedFecha = fecha && !isNaN(Date.parse(fecha))
            ? new Date(fecha).toISOString().split('T')[0] // Formato YYYY-MM-DD
            : new Date().toISOString().split('T')[0]; // Si la fecha no es válida, usa la fecha actual

        await pool.query(
            `INSERT INTO control_higiene_de_manos 
            (fecha, turno, area, usuario, sujeto_observado, observaciones, momentos, accesorios) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [formattedFecha, turno, area, usuario, sujeto_observado, observaciones, JSON.stringify(momentos), JSON.stringify(accesorios)]
        );

        return res.status(201).json('Registro creado correctamente');
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error al crear el registro');
    }
};



// Actualizar un registro existente
export const actualizarControl = async (req, res) => {
    const { id, fecha, turno, area, usuario, sujeto_observado, observaciones, momentos, accesorios } = req.body;

    try {
        await pool.query(
            `UPDATE control_higiene_de_manos 
            SET fecha = ?, turno = ?, area = ?, usuario = ?, sujeto_observado = ?, observaciones = ?, momentos = ?, accesorios = ? 
            WHERE id = ?`,
            [fecha, turno, area, usuario, sujeto_observado, observaciones, JSON.stringify(momentos), JSON.stringify(accesorios), id]
        );
        return res.status(200).json('Registro actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al actualizar el registro');
    }
};

// Eliminar un registro
export const eliminarControl = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM control_higiene_de_manos WHERE id = ?', [id]);
        return res.status(200).json('Registro eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el registro');
    }
};

export const getReportePorFechas = async (req, res) => {
    const { fechaInicio, fechaFin } = req.query;

    try {
        const [rows] = await pool.query(
            `SELECT * FROM control_higiene_de_manos WHERE fecha BETWEEN ? AND ?`,
            [fechaInicio, fechaFin]
        );

        return res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al generar el reporte" });
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
