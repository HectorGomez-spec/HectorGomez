import { Router } from 'express'
import { register,login, logOut, verifyToken,actualizarPermisos} from '../controller//Auth/auth.js'
import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.get('/actualizarPermisos/:Id',actualizarPermisos)



export default router;