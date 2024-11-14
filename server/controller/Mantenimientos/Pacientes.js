import { pool } from "../../database/conexion.js";

export const getPacientes = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT P.ID, P.NOMBRE, P.EDAD, P.FECHA_NACIMIENTO, P.TELEFONO, P.IDENTIDAD, S.SALA, G.NOMBRE_GENERO, P.DIAGNOSTICO  FROM pacientes P INNER JOIN genero G ON P.ID_GENERO = G.ID INNER JOIN salas S ON P.ID_SALA = S.ID');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los pacientes');
    }
}

export const crearPacientes = async (req, res) => {
    const { NOMBRE, DIRECCION, TELEFONO, CORREO, EDAD, FECHA_NACIMIENTO, IDENTIDAD, ID_GENERO, ID_SALA, DIAGNOSTICO } = req.body; //se tiene que llamar igual que en el register del front
    try {
        await pool.query('INSERT INTO pacientes (NOMBRE, DIRECCION, TELEFONO, CORREO, EDAD, FECHA_NACIMIENTO, IDENTIDAD, ID_GENERO, ID_SALA,DIAGNOSTICO) VALUES (?,?,?,?,?,?,?,?,?,?)', [NOMBRE, DIRECCION, TELEFONO, CORREO, EDAD, FECHA_NACIMIENTO, IDENTIDAD, ID_GENERO, ID_SALA,DIAGNOSTICO]);
        return res.status(200).json('paciente creado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los pacientes');
    }
}

export const actualizarPacientes = async (req, res) => {
    const { ID, NOMBRE, DIRECCION, TELEFONO, CORREO, EDAD, FECHA_NACIMIENTO, IDENTIDAD, ID_GENERO, ID_SALA } = req.body;
    console.log(req.body);
    try {
        await pool.query('UPDATE pacientes SET NOMBRE = ?, DIRECCION = ?, TELEFONO = ?, CORREO = ?, EDAD = ?, FECHA_NACIMIENTO = ?, IDENTIDAD = ?, ID_GENERO = ?, ID_SALA = ? WHERE ID = ? ', [NOMBRE, DIRECCION, TELEFONO, CORREO, EDAD, FECHA_NACIMIENTO, IDENTIDAD, ID_GENERO, ID_SALA, ID]);
        return res.status(200).json('paciente actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar el paciente');
    }
}

export const eliminarPacientes = async (req, res) => {
    const { ID } = req.params;
    console.log(req.params);    
    try {
        console.log(ID);
        await pool.query('DELETE FROM pacientes WHERE ID = ?', [ID]);
        return res.status(200).json('paciente eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar paciente');
    }
}

export const getGeneros = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM genero');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los generos');
    }
}

export const getSalas = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM salas');
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener las salas');
    }
}