import { Router } from 'express'
import { getPersonalMedico,crearPersonalMedico, actualizarPersonalMedico, eliminarPersonalMedico } from '../controller/Mantenimientos/PersonalMedico.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getPersonalMedico', getPersonalMedico);
router.post('/crearPersonalMedico', crearPersonalMedico);
router.put('/actualizarPersonalMedico', actualizarPersonalMedico);
router.delete('/eliminarPersonalMedico/:ID', eliminarPersonalMedico);

export default router;