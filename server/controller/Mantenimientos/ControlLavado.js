import { pool } from "../../database/conexion.js";

export const getControlLavado = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM control_lavado');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el control');
    }
}

export const crearControlLavado = async (req, res) => {
    const {ID_PERSONAL, ID_SALA, OBSERVACIONES } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO control_lavado (ID_PERSONAL, ID_SALA, OBSERVACIONES) VALUES (?,?,?)', [ID_PERSONAL, ID_SALA, OBSERVACIONES]);
        return res.status(200).json('Control del lavado actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el control');
    }
}

export const actualizarControlLavado = async (req, res) => {
    const { ID, ID_PERSONAL, ID_SALA, OBSERVACIONES } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE control_lavado SET ID_PERSONAL, ID_SALA, OBSERVACIONES = (?,?,?) WHERE ID = ? ', [ID_PERSONAL, ID_SALA, OBSERVACIONES, ID]);
        return res.status(200).json('control actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar el control');
    }
}

export const eliminarControlLavado = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM control_lavado WHERE ID = ?', [ID]);
        return res.status(200).json('Control Lavado eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el control lavado');
    }
}
