import { Router } from 'express'
import {actualizarPacientes,crearPacientes,eliminarPacientes,getPacientes,getGeneros,getSalas} from '../controller/Mantenimientos/Pacientes.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getPacientes', getPacientes);
router.post('/crearPaciente', crearPacientes);
router.put('/actualizarPaciente', actualizarPacientes);
router.delete('/eliminarPaciente/:ID', eliminarPacientes);
router.get('/getSalas', getSalas);
router.get('/getGeneros', getGeneros);



export default router;