import express from 'express';
import RoleController from './../Controllers/RoleController.js';
const router = express.Router();

router.post('/create', RoleController.create);

router.get('/:id', RoleController.getById);

router.get('/', RoleController.getAll);

export default router;