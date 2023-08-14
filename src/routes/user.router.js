import {Router} from "express";
import {login, register,logout,  githubResponse} from "../controllers/user.controller.js"
import passport from 'passport'
const userRouter = Router();

userRouter.post('/login',passport.authenticate('login'), login);
userRouter.post('/register',passport.authenticate('register'), register);
userRouter.get('/logout', logout);
//primer llamado desde el front, pasara por el middleware de passport-github lo cual perdira autorizacion para acceder al perfil. 
//Cuando se acceda al perfil, passport enviara la info hacia el callback especificado
userRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
//Este callback tiene que coincidir con el configurado en tu aplicacion en github, se encargara de hacer la redireccion final a la ventana del home.
userRouter.get('/profile-github', passport.authenticate('github', { scope: ['user:email'] }), githubResponse);

export default userRouter;