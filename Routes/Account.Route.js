import express from 'express';
import AccountController from '../Controllers/AccountController.js';
import {verifyToken} from './../Middlewares/VerifyToken.js';
const router = express.Router();

router.post('/create', AccountController.create);

router.patch('/confirm-account', AccountController.confirm);

router.get('/get-accounts', verifyToken,  AccountController.getAll);

router.get('/get-account/:id', AccountController.getByID);

router.put('/update-account/:id', AccountController.update);

router.post('/login', AccountController.login);

router.post('/refresh-token', AccountController.refreshToken);

export default router;