import nodemailer from 'nodemailer';
import config from '../config.js'


export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth:{
        user: config.user_Google,
        pass: config.pass_Google
    },
    tls: { //ONLY FOR DEV
        rejectUnauthorized: false
      }
});