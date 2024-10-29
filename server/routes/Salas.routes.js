import { Router } from 'express'
import {getSalas, actualizarSalas, crearSalas, eliminarSalas} from '../controller/Mantenimientos/Salas.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getSalas', getSalas);
router.post('/crearSalas', actualizarSalas);
router.put('/actualizarSalas', actualizarSalas);
router.delete('/eliminarSalas/:ID', eliminarSalas);

export default router;