import express from 'express';
import ServiceCustomerController from './../Controllers/ServiceCustomerController.js';
const router = express.Router();

router.get('/get-by-id/:id', ServiceCustomerController.getById);

router.get('/get-all-included', ServiceCustomerController.getAllIncluded);

router.post('/create', ServiceCustomerController.create);

router.post('/add-employee/:id', ServiceCustomerController.addEmployee);

router.get('/get-all', ServiceCustomerController.getAll);

export default router;