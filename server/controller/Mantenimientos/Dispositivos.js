import { pool } from "../../database/conexion.js";

export const getDispositivos = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM dispositivos');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el Dispositivo');
    }
}

export const crearDispositivos = async (req, res) => {
    const { DESCRIPCION, TIPO_DISPOSITIVO } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO dispositivos (DESCRIPCION, TIPO_DISPOSITIVO) VALUES (?,?)', [DESCRIPCION, TIPO_DISPOSITIVO]);
        return res.status(200).json('Dispositivo actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el Dispositivos');
    }
}

export const actualizarDispositivos = async (req, res) => {
    const { ID, DESCRIPCION, TIPO_DISPOSITIVO } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE dispositivos SET DESCRIPCION = ?, TIPO_DISPOSITIVO = ?  WHERE ID = ? ', [DESCRIPCION, TIPO_DISPOSITIVO, ID]);
        return res.status(200).json('Dispositivo actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al actualizar Dispositivo');
    }
}

export const eliminarDispositivos = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM dispositivos WHERE ID = ?', [ID]);
        return res.status(200).json('Dispositivos eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el Dispositivo');
    }
}
