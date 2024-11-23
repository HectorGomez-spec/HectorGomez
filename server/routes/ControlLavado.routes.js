import { Router } from 'express'
import { getControlLavado, crearControlLavado, actualizarControlLavado, eliminarControlLavado } from '../controller/Mantenimientos/ControlLavado.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getControlLavado', getControlLavado);
router.post('/crearControlLavado', crearControlLavado);
router.put('/actualizarControlLavado', actualizarControlLavado);
router.delete('/eliminarControlLavado/:ID', eliminarControlLavado);

export default router;