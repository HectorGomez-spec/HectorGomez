import { pool } from "../../database/conexion.js";

export const getPermisos = async (req, res) => {
    const query = "SELECT R.Id, OB.Id as IdObjeto, R.Nombre_Rol, OB.Objeto, PR.Actualizar,PR.Consultar,PR.Eliminar,PR.Insertar FROM Permisos PR INNER JOIN Objetos OB ON OB.Id = PR.Id_Objeto INNER JOIN Roles R ON R.Id = PR.Id_Rol ORDER BY R.NOMBRE_ROL ASC;";

    try {
        const result = await pool.query(query);
        res.json(result[0]);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

export const updatePermisos = async (req, res) => {
    const { Id } = req.params;
    const { Insertar, Actualizar, Eliminar, Consultar, Id_Objeto } = req.body;
    console.log(req.body);
    const query = 'UPDATE Permisos SET Insertar = ?, Actualizar = ?, Eliminar = ?, Consultar = ? WHERE Id_Rol = ? and Id_Objeto = ?';
    try {
        const result = await pool.query(query, [Insertar, Actualizar, Eliminar, Consultar, Id, Id_Objeto]);
        res.json({ message: "Permiso actualizado" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}