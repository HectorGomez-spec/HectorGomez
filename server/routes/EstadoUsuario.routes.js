import { Router } from 'express'
import {getEstadosUsuario,actualizarEstadoUsuario,crearEstadoUsuario,eliminarEstadoUsuario} from '../controller/Mantenimientos/EstadoUsuario.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getEstadosUsuario', getEstadosUsuario);
router.post('/crearEstadoUsuario', crearEstadoUsuario);
router.put('/actualizarEstadoUsuario', actualizarEstadoUsuario);
router.delete('/eliminarEstadoUsuario/:ID', eliminarEstadoUsuario);


export default router;