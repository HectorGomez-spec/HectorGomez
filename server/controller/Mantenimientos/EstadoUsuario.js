import { pool } from "../../database/conexion.js";

export const getEstadosUsuario = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM ESTADO_USUARIO');
        return res.status(200).json(response); // enviar la respuesta
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los estados de usuario');
    }
}

export const crearEstadoUsuario = async (req, res) => {
    const { DESCRIPCION } = req.body; // se tienen que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO ESTADO_USUARIO (DESCRIPCION) VALUES (?)', [DESCRIPCION]);
        return res.status(200).json('Estado de usuario creado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al crear el estado de usuario');
    }
}

export const actualizarEstadoUsuario = async (req, res) => {
    const { ID, DESCRIPCION } = req.body;
    try {
        await pool.query('UPDATE ESTADO_USUARIO SET DESCRIPCION = ? WHERE ID = ?', [DESCRIPCION, ID]);
        return res.status(200).json('Estado de usuario actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al actualizar el estado de usuario');
    }
}

export const eliminarEstadoUsuario = async (req, res) => {
    const { ID } = req.params;
    try {
        await pool.query('DELETE FROM ESTADO_USUARIO WHERE ID = ?', [ID]);
        return res.status(200).json('Estado de usuario eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el estado de usuario');
    }
}