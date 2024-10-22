import { Router } from 'express'
import { getUsuarios } from '../controller/Mantenimientos/Usuarios.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/getUsuarios', getUsuarios)




export default router;