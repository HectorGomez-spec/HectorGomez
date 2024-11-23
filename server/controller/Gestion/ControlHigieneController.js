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
        // Ajustar la fecha con zona horaria local
        const now = new Date();
        const formattedFecha = fecha && !isNaN(Date.parse(fecha))
            ? new Date(fecha).toISOString().split('T')[0]
            : new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0]; // Ajusta a la zona local

        await pool.query(
            `INSERT INTO control_higiene_de_manos 
            (fecha, turno, area, usuario, sujeto_observado, observaciones, momentos, accesorios) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                formattedFecha,
                turno,
                area,
                usuario,
                sujeto_observado,
                observaciones,
                JSON.stringify(momentos),
                JSON.stringify(accesorios),
            ]
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