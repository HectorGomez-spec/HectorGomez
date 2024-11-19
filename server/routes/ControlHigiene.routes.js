import { Router } from "express";
import {
    getControles,
    crearControl,
    actualizarControl,
    eliminarControl,
} from "../controller/Gestion/ControlHigieneController.js";

const router = Router();

router.get('/getControles', getControles); // Obtener todos los registros
router.post('/crearControl', crearControl); // Crear un nuevo registro
router.put('/actualizarControl', actualizarControl); // Actualizar un registro existente
router.delete('/eliminarControl/:id', eliminarControl); // Eliminar un registro

export default router;
