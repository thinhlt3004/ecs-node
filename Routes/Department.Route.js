import express from 'express';
import DepartmentController from '../Controllers/DepartmentController.js';
import {getIpAddress} from './../Helpers/GetIPAddress.js';
const router = express.Router();

router.post('/create', DepartmentController.create);

router.put('/update/:id', DepartmentController.update);

router.get('/:id', DepartmentController.getById);

router.get('/', getIpAddress, DepartmentController.getAll);



export default router;