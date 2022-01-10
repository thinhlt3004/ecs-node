import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import compression, { filter } from 'compression';
import os from 'os';
import {errorHandler, notFoundHandler} from './Helpers/HandleError.js';
import accountRoute from './Routes/Account.Route.js';
import departmentRoute from './Routes/Department.Route.js';
import roleRoute from './Routes/Role.Route.js';
import serviceRoute from './Routes/Service.Route.js';
import serviceCustomerRoute from './Routes/ServiceCustomer.Route.js';
import reportRoute from './Routes/Report.Route.js';
import path from 'path';
import {getIpAddress} from './Helpers/GetIPAddress.js';
dotenv.config();
process.env.UV_THREADPOOL_SIZE=os.cpus().length;

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGOURL;
const __dirname = path.resolve();
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(getIpAddress);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression({
    level: 6,
    threshold: 100 * 1000, 
    filter: (req, res) => {
        if(req.headers['x-no-compress']){
            return false;
        }
        return compression.filter(req, res);
    }
}));



app.use('/api/Account', accountRoute);

app.use('/api/Department', departmentRoute);

app.use('/api/Role', roleRoute);

app.use('/api/Service', serviceRoute);

app.use('/api/ServiceCustomer', serviceCustomerRoute);

app.use('/api/Report', reportRoute);

app.use(notFoundHandler);

app.use(errorHandler);



const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Mongo Connected');
        app.listen(PORT, () => {
            console.log(`App is running in ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
}

start();