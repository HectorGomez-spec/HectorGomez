import { Router } from 'express'
import { register,login, logOut, verifyToken,verifyCode,recuperarContraseña} from '../controller/Auth/auth.js'
// import {authRequired} from '../middleware/isAuthenticate.js'
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logOut)
router.get('/verifyToken',verifyToken)
router.post('/verifyCode',verifyCode)
router.post('/recuperarContrasena',recuperarContraseña)



export default router;