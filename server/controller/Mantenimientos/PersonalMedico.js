import { pool } from "../../database/conexion.js";

export const getPersonalMedico = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM personal_medico');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el PersonalMedico');
    }
}

export const crearPersonalMedico = async (req, res) => {
    const {NOMBRE, ID_USUARIO, ID_ESPECIALIDAD, DIRECCION, TELEFONO } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO control_lavado (NOMBRE, ID_USUARIO, ID_ESPECIALIDAD, DIRECCION, TELEFONO) VALUES (?,?,?,?,?)', [NOMBRE, ID_USUARIO, ID_ESPECIALIDAD, DIRECCION, TELEFONO]);
        return res.status(200).json('personal medico actualizado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener el personal');
    }
}

export const actualizarPersonalMedico = async (req, res) => {
    const { ID, NOMBRE, ID_USUARIO, ID_ESPECIALIDAD, DIRECCION, TELEFONO } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE personal_medico SET NOMBRE, ID_USUARIO, ID_ESPECIALIDAD, DIRECCION, TELEFONO = (?,?,?,?,?) WHERE ID = ? ', [NOMBRE, ID_USUARIO, ID_ESPECIALIDAD, DIRECCION, TELEFONO, ID]);
        return res.status(200).json('personal actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar el personal');
    }
}

export const eliminarPersonalMedico = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM personal_medico WHERE ID = ?', [ID]);
        return res.status(200).json('Personal Medico eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el Personal Medico');
    }
}
