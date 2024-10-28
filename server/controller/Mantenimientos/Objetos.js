import { pool } from "../../database/conexion.js";

export const getObjetos = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM objetos');
        return res.status(200).json(response.map);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los objetos');
    }
}

export const crearObjetos = async (req, res) => {
    const { OBJETO, DESCRIPCION } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO objetos (OBJETO,DESCRIPCION) VALUES (?,?)', [OBJETO, DESCRIPCION]);
        return res.status(200).json('objeto actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los objetos');
    }
}

export const actualizarObjetos = async (req, res) => {
    const { ID, OBJETO, DESCRIPCION } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE objetos SET OBJETO = ? WHERE ID = ? ', [OBJETO, DESCRIPCION, ID]);
        return res.status(200).json('objeto actualizada correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar el objeto');
    }
}

export const eliminarObjetos = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM objetos WHERE ID = ?', [ID]);
        return res.status(200).json('objeto eliminada correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar objeto');
    }
}
