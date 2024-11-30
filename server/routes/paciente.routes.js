import { Router } from 'express';
import {
    getPacientes,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} from "../controller/Pacientes/Pacientes.controller.js";

const router = Router();

router.get("/", getPacientes); // Obtener todos los pacientes
router.post("/", crearPaciente); // Crear un nuevo paciente
router.put("/:id", actualizarPaciente); // Actualizar un paciente existente
router.delete("/:id", eliminarPaciente); // Eliminar un paciente por su ID

export default router;
