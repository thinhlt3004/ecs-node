import { logEvents } from "./LogEvents.js";
import {v4 as uuid} from 'uuid';

export const errorHandler = (err, req, res, next) => {
    logEvents(
        `id: ${uuid().substring(0, 8)} - ${req.url} - ${req.method} - ${
          err.status || 500
        } - ${err.message}`
    );
    return res.status(err.status || 500).json({msg: err});
}


export const notFoundHandler = (req, res, next) => {
    logEvents(
        `id: ${uuid().substring(0, 8)} - ${req.url} - ${req.method} - 404 - Not Found`
    );
    return res.status(404).json({msg: 'Not Found'});
}