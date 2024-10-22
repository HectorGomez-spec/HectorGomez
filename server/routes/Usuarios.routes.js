import { Router } from 'express'
import { getUsuarios,actualizarUsuario,crearUsuario,eliminarUsuario, getRoles, getEstados } from '../controller/Mantenimientos/Usuarios.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getUsuarios', getUsuarios);
router.post('/crearUsuario', crearUsuario);
router.put('/actualizarUsuario', actualizarUsuario);
router.delete('/eliminarUsuario/:ID', eliminarUsuario);
router.get('/getRoles', getRoles);
router.get('/getEstados', getEstados);


export default router;