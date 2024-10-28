import { pool } from "../../database/conexion.js";

export const getEspecialidad = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM especialidad');
        return res.status(200).json(response.map);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener la especialidad');
    }
}

export const crearEspecialidad = async (req, res) => {
    const { NOMBRE_ESPECIALIDAD } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO especialidad (NOMBRE_ESPECIALIDAD) VALUES (?)', [NOMBRE_ESPECIALIDAD]);
        return res.status(200).json('especialidad actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener la especialidad');
    }
}

export const actualizarEspecialidad = async (req, res) => {
    const { ID, NOMBRE_ESPECIALIDAD } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE salas SET especialidad = ? WHERE ID = ? ', [NOMBRE_ESPECIALIDAD, ID]);
        return res.status(200).json('especialidad actualizada correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar la especialidad');
    }
}

export const eliminarEspecialidad = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM especialidad WHERE ID = ?', [ID]);
        return res.status(200).json('especialidad eliminada correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar la especialidad');
    }
}
