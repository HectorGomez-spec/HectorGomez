import { pool } from "../../database/conexion.js";

export const getSalas = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM salas');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los salas');
    }
}

export const crearSalas = async (req, res) => {
    const { SALA } = req.body; //se tiene que llamar igual que en el register del front
    console.log(req.body);
    try {
        await pool.query('INSERT INTO salas (SALA) VALUES (?)', [SALA]);
        return res.status(200).json('sala creada correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener las salas');
    }
}

export const actualizarSalas = async (req, res) => {
    const { ID, SALA } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE salas SET SALA = ? WHERE ID = ? ', [SALA, ID]);
        return res.status(200).json('Sala actualizada correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar la sala');
    }
}

export const eliminarSalas = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM salas WHERE ID = ?', [ID]);
        return res.status(200).json('Sala eliminada correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar la sala');
    }
}
