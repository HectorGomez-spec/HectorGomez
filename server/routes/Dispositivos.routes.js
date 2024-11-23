import { Router } from 'express'
import { getDispositivos, crearDispositivos, actualizarDispositivos, eliminarDispositivos} from '../controller/Mantenimientos/Dispositivos.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getDispositivos', getDispositivos);
router.post('/crearDispositivos', crearDispositivos);
router.put('/actualizarDispositivos', actualizarDispositivos);
router.delete('/eliminarDispositivos/:ID', eliminarDispositivos);

export default router;