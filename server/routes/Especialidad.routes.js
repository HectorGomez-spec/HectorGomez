import { Router } from 'express'
import { actualizarEspecialidad, crearEspecialidad, eliminarEspecialidad, getEspecialidad } from '../controller/Mantenimientos/Especialidad.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getEspecialidad', getEspecialidad);
router.post('/crearEspecialidad', crearEspecialidad);
router.put('/actualizarEspecialidad', actualizarEspecialidad);
router.delete('/eliminarEspecialidad/:ID', eliminarEspecialidad);

export default router;