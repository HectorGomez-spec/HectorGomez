import { Router } from 'express'
import { getInfeccion, crearInfeccion, actualizarInfeccion, eliminarInfeccion} from '../controller/Mantenimientos/Infeccion.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getInfeccion', getInfeccion);
router.post('/crearInfeccion', crearInfeccion);
router.put('/actualizarInfeccion', actualizarInfeccion);
router.delete('/eliminarInfeccion/:ID', eliminarInfeccion);

export default router;