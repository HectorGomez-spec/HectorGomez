import { pool } from "../../database/conexion.js";

export const getGenero = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM genero');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener un genero');
    }
}

export const crearGenero = async (req, res) => {
    const { NOMBRE_GENERO } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO genero (NOMBRE_GENERO) VALUES (?)', [NOMBRE_GENERO]);
        return res.status(200).json('Genero actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener un genero');
    }
}

export const actualizarGenero = async (req, res) => {
    const { ID, NOMBRE_GENERO } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE genero SET NOMBRE_GENERO = ? WHERE ID = ? ', [NOMBRE_GENERO, ID]);
        return res.status(200).json('Genero actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar un genero');
    }
}

export const eliminarGenero = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM genero WHERE ID = ?', [ID]);
        return res.status(200).json('Genero eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar un genero');
    }
}
