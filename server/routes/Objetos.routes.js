import { Router } from 'express'
import { actualizarObjetos, crearObjetos, eliminarObjetos, getObjetos } from '../controller/Mantenimientos/Objetos.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getObjetos', getObjetos);
router.post('/crearObjetos', crearObjetos);
router.put('/actualizarObjetos', actualizarObjetos);
router.delete('/eliminarObjetos/:ID', eliminarObjetos);

export default router;