import { pool } from "../../database/conexion.js";

export const getEstadoMonitoreo = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM estado_monitoreo');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el Estado Monitoreo');
    }
}

export const crearEstadoMonitoreo = async (req, res) => {
    const { NOMBRE_ESTADO } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO estado_monitoreo (NOMBRE_ESTADO) VALUES (?)', [ NOMBRE_ESTADO]);
        return res.status(200).json('Estado Monitoreo creado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el Estado Monitoreo');
    }
}

export const actualizarEstadoMonitoreo = async (req, res) => {
    const { ID, NOMBRE_ESTADO } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE estado_monitoreo SET NOMBRE_ESTADO = ? WHERE ID = ? ', [NOMBRE_ESTADO, ID]);
        return res.status(200).json('Estado monitoreo actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar el estado');
    }
}

export const eliminarEstadoMonitoreo = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM estado_monitoreo WHERE ID = ?', [ID]);
        return res.status(200).json('Registro eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el Dispositivo');
    }
}
