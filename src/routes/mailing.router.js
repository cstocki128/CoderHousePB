import {Router} from "express";
import * as controller from "../controllers/mailing.controller.js"
import passport from "passport"
const mailingRouter = new Router();

mailingRouter.post('/send', controller.send);
mailingRouter.post('/resetPass', controller.resetPass);

export default mailingRouter;