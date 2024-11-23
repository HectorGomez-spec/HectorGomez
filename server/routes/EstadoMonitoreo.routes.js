import { Router } from 'express'
import { getEstadoMonitoreo, crearEstadoMonitoreo, actualizarEstadoMonitoreo, eliminarEstadoMonitoreo} from '../controller/Mantenimientos/EstadoMonitoreo.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getEstadoMonitoreo', getEstadoMonitoreo);
router.post('/crearEstadoMonitoreo', crearEstadoMonitoreo);
router.put('/actualizarEstadoMonitoreo', actualizarEstadoMonitoreo);
router.delete('/eliminarEstadoMonitoreo/:ID', eliminarEstadoMonitoreo);

export default router;