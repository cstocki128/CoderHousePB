import * as service from "../services/mailing.services.js";
import config from "../config.js";

export const send = async(req, res) => {
    try {
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
        console.log(error);
    }
};