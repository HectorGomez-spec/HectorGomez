import { pool } from "../../database/conexion.js";

export const getRoles = async (req, res) => {
    const query = "SELECT * FROM rol";
    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const guardarRol = async (req, res) => {
    const connection = await pool.getConnection();
    const query = "INSERT INTO Roles (NOMBRE_ROL,DESCRIPCION) VALUES (UPPER(?), UPPER(?))";
    const query2 = "SELECT * FROM Roles Where NOMBRE_ROL = ?";
    const { NOMBRE_ROL, DESCRIPCION, Objetos } = req.body;
    try {
        const result = await connection.query(query2, [NOMBRE_ROL]); //Verificar si el rol ya existe
        if (result[0].length > 0) {
            return res.json({ IsValid: false, message: "El nombre del rol ya existe" });
        }
        await connection.beginTransaction();
        const [row] = await connection.query(query, [NOMBRE_ROL, DESCRIPCION]);//Insertar el rol

        for (let objeto of Objetos) { //Insertar los permisos
            const query = "INSERT INTO Permisos (Id_Rol, Id_Objeto, Actualizar,Consultar,Insertar,Eliminar) VALUES (?, ?,1,1,1,1)";
            await connection.query(query, [row.insertId, objeto]);
        }
        await connection.commit();
        res.json({ IsValid: true, message: "Rol guardado con éxito" });
    } catch (error) {
        await connection.rollback();
        console.log(error);
        res.status(400).json({ error: error });
    } finally {
        connection.release();
    }

}

export const deleteRol = async (req, res) => {
    const connection = await pool.getConnection();
    const { id } = req.params;
    const query = "DELETE FROM Roles WHERE Id = ?";
    const query2 = "DELETE FROM Permisos WHERE Id_Rol = ?";
    try {
        await connection.beginTransaction();
        await connection.query(query2, [id]);
        await connection.query(query, [id]);
        await connection.commit();
        res.json({ message: "Rol eliminado con éxito" });
    } catch (error) {
        await connection.rollback();
        res.status(400).json({ error: error });
        console.log(error);
    }
}

export const getPermisosByRolId = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM Permisos WHERE Id_Rol = ?";
    try {
        const result = await pool.query(query, [id]);
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const updateRol = async (req, res) => {
    const connection = await pool.getConnection();
    const { id } = req.params;
    const { NOMBRE_ROL, DESCRIPCION, objetosEliminados, objetosAgregados } = req.body;
    const query = "UPDATE roles SET Nombre_Rol = UPPER(?), Descripcion = UPPER(?) WHERE Id = ?";
    const query2 = "DELETE FROM Permisos WHERE Id_Rol = ? and Id_Objeto = ?";
    const query3 = "INSERT INTO Permisos (Id_Rol, Id_Objeto, Insertar,Actualizar,Eliminar,Consultar) VALUES (?, ?,1,1,1,1)";
    const query4 = "SELECT * FROM Roles Where Nombre_Rol = ? and Id <> ?";

    try {
        const result = await connection.query(query4, [NOMBRE_ROL, id]);
        if (result[0].length > 0) {
            return res.json({ IsValid: false, message: "El nombre del rol ya existe" });
        }
        await connection.beginTransaction();
        await connection.query(query, [NOMBRE_ROL, DESCRIPCION, id]);
        for (let objeto of objetosEliminados) {
            await connection.query(query2, [id, objeto]);
        }
        for (let objeto of objetosAgregados) {
            await connection.query(query3, [id, objeto]);
        }
        await connection.commit();
        res.json({ IsValid: true, message: "Rol actualizado con éxito" });

    } catch (error) {
        await connection.rollback();
        res.status(400).json({ error: error });
    } finally {
        connection.release();
    }
}