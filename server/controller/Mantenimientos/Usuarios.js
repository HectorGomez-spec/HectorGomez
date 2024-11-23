import { pool } from "../../database/conexion.js";
import {cryptPassword} from '../../lib/helpers.js';

export const getUsuarios = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT U.NOMBRE,U.APELLIDO,U.CORREO, U.ID AS ID,R.NOMBRE_ROL, R.ID AS IDROL, ESTADO_USUARIO.DESCRIPCION, ESTADO_USUARIO.ID AS IDESTADO FROM usuario U INNER JOIN ESTADO_USUARIO ON U.ID_ESTADO_USUARIO = ESTADO_USUARIO.ID INNER JOIN ROLES R ON U.ID_ROL = R.ID');

        return res.status(200).json(response.map((usuario) => {
            return {
                ID: usuario.ID,
                NOMBRE1: usuario.NOMBRE + ' ' + usuario.APELLIDO,
                NOMBRE: usuario.NOMBRE,
                APELLIDO: usuario.APELLIDO,
                CORREO: usuario.CORREO,
                ESTADO: usuario.DESCRIPCION,
                ROL: usuario.NOMBRE_ROL,
                IDROL: usuario.IDROL,
                IDESTADO: usuario.IDESTADO
            };
        }));
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al obtener los usuarios');
    }
}

export const crearUsuario = async (req, res) => {
    try {
        const { NOMBRE, APELLIDO, USER_PASSWORD, CORREO, ID_ESTADO_USUARIO,ID_ROL } = req.body;
        const newUser = {
            NOMBRE,
            USER_PASSWORD,
            CORREO,
            APELLIDO,
            ID_ESTADO_USUARIO,
            ID_ROL,
            Creado_Por: 'Auto Registro',
            Fecha_Creacion: new Date()
        }
        newUser.USER_PASSWORD = await cryptPassword(USER_PASSWORD);
        const [resp] = await pool.query('select * from Usuario where Correo = ?', [CORREO]);
        if (resp.length > 0) return res.status(400).json("El correo ya existe")

        await pool.query('insert into Usuario set ?', [newUser])
        res.json("Usuario registrado");

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

export const actualizarUsuario = async (req, res) => {
    const { ID, NOMBRE, APELLIDO, CORREO, ID_ESTADO_USUARIO, ID_ROL } = req.body;
    console.log(req.body);
    try {
        const [resp] = await pool.query('SELECT * FROM usuario WHERE CORREO = ? AND ID <> ?', [CORREO, ID]);//validar que el correo no exista
        if (resp.length > 0) {
            return res.status(400).json('El correo ya se encuentra registrado');
        }
        await pool.query('UPDATE usuario SET NOMBRE = ?, APELLIDO = ?, CORREO = ?, ID_ESTADO_USUARIO = ?, ID_ROL = ? WHERE ID = ?', [NOMBRE, APELLIDO, CORREO, ID_ESTADO_USUARIO, ID_ROL, ID]);
        return res.status(200).json('Usuario actualizado correctamente');
    } catch (error) {
        console.log(error); 
        return res.status(500).json('Error al actualizar el usuario');
    }
}

export const eliminarUsuario = async (req, res) => {
    const { ID } = req.params;
    try {
        console.log(ID);
        await pool.query('DELETE FROM usuario WHERE ID = ?', [ID]);
        return res.status(200).json('Usuario eliminado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al eliminar el usuario');
    }
}

export const getRoles = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM ROLES');
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json('Error al obtener los roles');
    }
}

export const getEstados = async (req, res) => {
    try {
        const [response] = await pool.query('SELECT * FROM ESTADO_USUARIO');
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json('Error al obtener los estados');
    }
}


