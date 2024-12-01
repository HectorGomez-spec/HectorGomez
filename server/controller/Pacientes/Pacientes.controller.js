import { pool } from "../../database/conexion.js";

// Obtener todos los pacientes
export const getPacientes = async (req, res) => {
    try {
        console.log("Obteniendo todos los pacientes...");
        const [response] = await pool.query(`
            SELECT 
                id,
                nombre,
                edad,
                genero,
                habitacion,
                visita,
                diagnostico,
                fecha_registro,
                fecha_alta,
                dias_hospitalizados,
                sala,
                infeccion,
                procedimiento,
                cantidad_dispositivos,
                observaciones,
                dispositivo_otro_hospital,
                creado_en,
                actualizado_en
            FROM pacientes
        `);

        if (response.length === 0) {
            console.log("No hay pacientes registrados.");
            return res.status(200).json("No hay pacientes registrados.");
        }

        console.log("Pacientes obtenidos:", response);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        return res.status(500).json("Error al obtener los pacientes");
    }
};

// Crear un nuevo paciente
export const crearPaciente = async (req, res) => {
    const {
        nombre,
        edad,
        genero,
        habitacion,
        visita,
        diagnostico,
        fecha_registro,
        fecha_alta,
        dias_hospitalizados,
        sala,
        infeccion,
        procedimiento,
        cantidad_dispositivos,
        observaciones,
        dispositivo_otro_hospital,
    } = req.body;

    console.log("Datos recibidos para crear paciente:", req.body);

    try {
        const result = await pool.query(
            `INSERT INTO pacientes 
            (nombre, edad, genero, habitacion, visita, diagnostico, fecha_registro, fecha_alta, dias_hospitalizados, sala, infeccion, procedimiento, cantidad_dispositivos, observaciones, dispositivo_otro_hospital) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nombre,
                edad,
                genero,
                habitacion,
                visita,
                diagnostico,
                fecha_registro,
                fecha_alta || null, // Si no hay fecha de alta, se inserta como NULL
                dias_hospitalizados || null, // Si no hay días hospitalizados, se inserta como NULL
                sala,
                infeccion,
                procedimiento,
                cantidad_dispositivos,
                observaciones || null, // Si no hay observaciones, se inserta como NULL
                dispositivo_otro_hospital || false, // Valor booleano, por defecto `false`
            ]
        );

        console.log("Resultado de la inserción:", result);
        return res.status(201).json("Paciente registrado correctamente");
    } catch (error) {
        console.error("Error al registrar el paciente:", error);
        return res.status(500).json("Error al registrar el paciente");
    }
};

// Actualizar un paciente
export const actualizarPaciente = async (req, res) => {
    const { id } = req.params; // El ID viene desde el parámetro de la URL
    const {
        nombre,
        edad,
        genero,
        habitacion,
        visita,
        diagnostico,
        fecha_registro,
        fecha_alta,
        dias_hospitalizados,
        sala,
        infeccion,
        procedimiento,
        cantidad_dispositivos,
        observaciones,
        dispositivo_otro_hospital,
    } = req.body;

    console.log("ID recibido para actualizar paciente:", id);
    console.log("Datos recibidos para actualizar paciente:", req.body);

    try {
        const result = await pool.query(
            `UPDATE pacientes 
            SET nombre = ?, edad = ?, genero = ?, habitacion = ?, visita = ?, diagnostico = ?, fecha_registro = ?, fecha_alta = ?, dias_hospitalizados = ?, sala = ?, infeccion = ?, procedimiento = ?, cantidad_dispositivos = ?, observaciones = ?, dispositivo_otro_hospital = ? 
            WHERE id = ?`,
            [
                nombre,
                edad,
                genero,
                habitacion,
                visita,
                diagnostico,
                fecha_registro,
                fecha_alta || null,
                dias_hospitalizados || null,
                sala,
                infeccion,
                procedimiento,
                cantidad_dispositivos,
                observaciones || null,
                dispositivo_otro_hospital || false,
                id, // El ID al final del array
            ]
        );

        console.log("Resultado de la actualización:", result);
        if (result.affectedRows === 0) {
            return res.status(404).json("Paciente no encontrado");
        }

        return res.status(200).json("Paciente actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        return res.status(500).json("Error al actualizar el paciente");
    }
};

// Eliminar un paciente
export const eliminarPaciente = async (req, res) => {
    const { id } = req.params;

    console.log("ID recibido para eliminar paciente:", id);

    try {
        const result = await pool.query("DELETE FROM pacientes WHERE id = ?", [id]);

        console.log("Resultado de la eliminación:", result);
        return res.status(200).json("Paciente eliminado correctamente");
    } catch (error) {
        console.log("Error al eliminar el paciente:", error);
        return res.status(500).json("Error al eliminar el paciente");
    }
};
