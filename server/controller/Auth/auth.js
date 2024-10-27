import { pool } from '../../database/conexion.js'
import { createAccessToken } from '../../lib/jwt.js'
import { cryptPassword, matchPassword, generarCodigo, enviarCorreo } from '../../lib/helpers.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'

export const register = async (req, res) => {
    try {
        const { Nombre, Apellido, User_Password, Correo, Telefono, Direccion, Fecha_Nacimiento } = req.body;
        const newUser = {
            Nombre,
            User_Password,
            Correo,
            Apellido,
            Telefono,
            Direccion,
            Fecha_Nacimiento,
            Creado_Por: 'Auto Registro',
            Id_Estado_Usuario: 2,
            Fecha_Creacion: new Date()
        }
        newUser.User_Password = await cryptPassword(User_Password);
        const [resp] = await pool.query('select * from Usuario where Correo = ?', [Correo]);
        if (resp.length > 0) return res.status(400).json({ message: "El correo ya existe" })

        await pool.query('insert into Usuario set ?', [newUser])
        res.json({ message: "Usuario registrado" })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { CORREO, USER_PASSWORD } = req.body;

        //validar que exista el correo
        const [user] = await pool.query('select * from Usuario where Correo = ?', [CORREO]);
        if (user.length === 0) return res.status(400).json({ message: "Usuario o contraseña incorrecta" })

        //si el correo existe, se valida la contraseña
        const validPassword = await matchPassword(USER_PASSWORD, user[0].USER_PASSWORD);
        if (!validPassword) return res.status(400).json({ message: "Usuario o contraseña incorrecta" });

        //si la contraseña es correcta, se crea un token
        const codigo = generarCodigo();
        const token = await createAccessToken({ Id: codigo }, '2m');
        //se actualiza el token en la base de datos
        await pool.query('update Usuario set Token = ? where Id = ?', [token, user[0].ID]);
        enviarCorreo('Codigo de acceso', '', `Hola ${user[0].NOMBRE} este es tu codigo de acceso: <strong>${codigo}</strong>, tienes 2 minutos para usarlo`, CORREO);
        res.status(200).json({ IsValid: true, message: "Te hemos enviado un correo" });
  
    } catch (error) {
        res.status(500).json({ message: 'error al iniciar sesión' });
    }
}

export const verifyCode = async (req, res) => {
    try {
        const { CORREO, CODIGO} = req.body;
        // verificar que el correo exista en la base de datos 
        const [user] = await pool.query('select * from Usuario where Correo = ?', [CORREO]);
        if (user.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });

        jwt.verify(user[0].TOKEN, SECRET_KEY, async (err, decoded) => {
            if (err) return res.status(401).json({ message: "Codigo de acceso invalido" });
            if (decoded.payload.Id !== CODIGO) return res.status(401).json({ message: "Codigo incorrecto" });
            const token = await createAccessToken({ Id: user[0].ID }, '10s');
            res.cookie('token', token)
            res.json([user]);
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const logOut = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })

    return res.sendStatus(200);
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No estas autorizado" });

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(401).json({ message: "No estas autorizado" });
        const [user] = await pool.query('select * from Usuario where Id = ?', [decoded.payload.Id]);
        if (user.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });
        // const [permisos] = await pool.query('select * from Permisos where IdRol = ?', [user[0].IdRol]);
        res.json([user]);
    })
}

export const recuperarContraseña = async (req, res) => {
    try {
        const { CORREO } = req.body;
        const [user] = await pool.query('select * from Usuario where Correo = ?', [CORREO]);
        if (user.length === 0) return res.status(400).json({ message: "Usuario no encontrado" });

        const password = generarCodigo();
        const hashPassword = await cryptPassword(password);
        await pool.query('update Usuario set User_Password = ? where Id = ?', [hashPassword, user[0].ID]);
        enviarCorreo('Recuperar contraseña', '', `Hola ${user[0].NOMBRE} este es tu codigo de acceso: <strong>${password}</strong>`, CORREO);
        res.status(200).json({ IsValid: true, message: "Te hemos enviado un correo" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const actualizarPermisos = async (req, res) => {
//     const { Id } = req.params;
//     try {

//         const [user] = await pool.query('select * from Usuario where Id = ?', [Id]);
//         const [permisos] = await pool.query('select * from Permisos where IdRol = ?', [user[0].IdRol]);
//         console.log(permisos);
//         res.json([user, permisos]);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }