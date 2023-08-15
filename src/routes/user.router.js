import {Router} from "express";
import {login, register,logout} from "../controllers/user.controller.js"
import passport from 'passport'
const userRouter = Router();

userRouter.post('/login',passport.authenticate('login',{ failureRedirect: '/error-login' }), login);
userRouter.post('/register',passport.authenticate('register',{ failureRedirect: '/error-register' }), register);
userRouter.get('/logout', logout);


export default userRouter;