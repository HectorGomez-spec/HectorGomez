import { pool } from "../../database/conexion.js";

export const getInfeccion = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM infeccion');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener la Infeccion');
    }
}

export const crearInfeccion = async (req, res) => {
    const { NOMBRE_INFECCION, DESCRIPCION } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO INFECCION (NOMBRE_INFECCION, DESCRIPCION) VALUES (?,?)', [NOMBRE_INFECCION, DESCRIPCION]);
        return res.status(200).json('Infeccion actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener la Infeccion');
    }
}

export const actualizarInfeccion = async (req, res) => {
    const { ID, NOMBRE_INFECCION, DESCRIPCION } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE infeccion SET NOMBRE_INFECCION = ?, DESCRIPCION = ? WHERE ID = ? ', [NOMBRE_INFECCION, DESCRIPCION, ID]);
        return res.status(200).json('Infeccion actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar la Infeccion');
    }
}

export const eliminarInfeccion = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM infeccion WHERE ID = ?', [ID]);
        return res.status(200).json('Infeccion eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar la Infeccion');
    }
}
