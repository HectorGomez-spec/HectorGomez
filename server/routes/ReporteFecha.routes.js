import { Router } from 'express'
import { getReportePorFechas } from "../controller/Reportes/ReporteFechaController.js";
import { getEstadisticas } from "../controller/Reportes/ReporteFechaController.js";
const router = Router();

router.get('/reporte/fechas', getReportePorFechas); // Reporte por fechas
router.get('/reporte/estadisticas', getEstadisticas); // Estadísticas

export default router;