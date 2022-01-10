import express from 'express';
import ServiceController from '../Controllers/ServiceController.js';
import { verifyToken } from '../Middlewares/VerifyToken.js';
import {isAdmin} from './../Middlewares/AdminAccess.js';
const router = express.Router();

router.get('/get-all-services/:id', ServiceController.getAllAggregations);

router.post('/create', ServiceController.create);

router.get('/get-by-category/:id', ServiceController.getByCategory);

router.get('/:id', ServiceController.getByID);


router.put('/:id', verifyToken, isAdmin, ServiceController.update);


router.get('/', verifyToken, isAdmin, ServiceController.getAll);
export default router;
