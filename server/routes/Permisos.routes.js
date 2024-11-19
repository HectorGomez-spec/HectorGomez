import { Router } from 'express';
import {getPermisos, updatePermisos } from '../controller/Mantenimientos/Permisos.js';
const router = Router();

router.get('/GetPermisos', getPermisos);
router.put('/UpdatePermisos/:Id', updatePermisos);



export default router;