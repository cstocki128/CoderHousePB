import * as service from "../services/mailing.services.js";
import {generateTokenMail} from "../middlewares/jwt.js"
import config from "../config.js";
import {logger} from "../utils/logger.js"

export const send = async(req, res) => {
    try {
        logger.http('mailing.send executed')
        let result = await service.transport.sendMail({
            from: `Coder Tests ${config.user_Google}`,
            to: req.body.email,
            subject:req.body.subject,
            html: `
            <div>
                <h1>${req.body.title}</h1>
                ${req.body.message}
            </div>
            `,
            attachments: []
        });
        res.json(result);
    } catch (error) {
        next(err);
    }
};

export const resetPass = async (req, res, next) => {
    try {
        logger.http('views.resetPasswordMail executed')
        let result = await service.transport.sendMail({
            from: `Coder Tests ${config.user_Google}`,
            to: req.body.email,
            subject:'Reset your Password!',
            html: `
            <div>
                <h1>Hello ${req.body.email}, click here 
                <a href='http://localhost:8080/resetPassword'>LINK</a> 
                to reset your password!</h1>
            </div>
            `,
            attachments: []
        });
        const tokenResetPass = await generateTokenMail(req.body.email)
        res
            .cookie('tokenpass', tokenResetPass)
            .redirect('/login')
    } catch (error) {
        next(error.message);  
    }
}