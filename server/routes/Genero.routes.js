import { Router } from 'express'
import { actualizarGenero, crearGenero, eliminarGenero, getGenero } from '../controller/Mantenimientos/Genero.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getGenero', getGenero);
router.post('/crearGenero', crearGenero);
router.put('/actualizarGenero', actualizarGenero);
router.delete('/eliminarGenero/:ID', eliminarGenero);

export default router;