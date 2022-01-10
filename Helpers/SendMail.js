import nodemailer from "nodemailer";
import {sendConfirmRegister} from './../Templates/ConfirmRegister.js';

const getEmailData = (to, name, type, data) => {
    switch(type){
        case "ConfirmRegister":
            data = {
                from : 'Thinh Le <thinh.lt0496@gmail.com>',
                to : to,
                subject: `Hello ${name}`,
                html: sendConfirmRegister(data),
            };
            break;      
        default:
            break;
    }
    return data;
}

export const sendMail = (to, name, type, data) => {
    // create reusable transporter object using the default SMTP transport
    const smtpTransport = nodemailer.createTransport({
        service: "Gmail", //Service: Google Mail
        auth:{
            user: "thinh.lt0496@gmail.com", //Email Sender
            pass: 'jmlbdorndnrefqzg', //App Password of Email Sender
        }
    });

    const mail = getEmailData(to, name, type, data);

    smtpTransport.sendMail(mail, (error, response) => {
        if(error){
            console.log(error);
        }else{
            console.log('Email sent successfully');
        }
    });
    smtpTransport.close();
}