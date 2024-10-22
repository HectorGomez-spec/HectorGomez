import { pool } from "../../database/conexion.js";

export const getUsuarios = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM usuario U INNER JOIN ESTADO_USUARIO ON U.ID_ESTADO_USUARIO = ESTADO_USUARIO.ID ');
        return res.status(200).json(response.map((usuario) => {
            return {
                ID: usuario.Id,
                NOMBRE: usuario.NOMBRE + ' ' + usuario.APELLIDO,
                CORREO: usuario.CORREO,
                TELEFONO: usuario.TELEFONO,
                DIRECCION: usuario.DIRECCION,
                ESTADO: usuario.DESCRIPCION,
            };
        }));
    } catch (error) {
        return res.status(500).json('Error al obtener los usuarios');
    }
}

