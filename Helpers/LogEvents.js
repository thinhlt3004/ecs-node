import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
const fsPromise = fs.promises;
const __dirname = path.resolve();

const fileName = path.join(__dirname, 'Logs', 'logs.log');

export const logEvents = async (msg) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyy\tss:mm:HH')}`;
    const contentLog = `${dateTime}. ${msg} \n`;
    try {
        fsPromise.appendFile(fileName, contentLog);
    } catch (error) {
        console.log(error);
    }
}