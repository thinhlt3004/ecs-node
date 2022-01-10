import express from 'express';
import ReportController from '../Controllers/ReportController.js';
const router = express.Router();

router.post('/create', ReportController.create);

router.get('/get-by-service-customer/:id', ReportController.getAll);

router.get('/get-by-service-customer/:id/get-report-pdf', ReportController.getReportPDF);

router.get('/get-by-service-customer/:id/get-report-excel', ReportController.getReportExcel);


export default router;
