import express from "express";
import * as controller from "../controllers/views.controller.js"
import validateLogin from "../middlewares/validateLogin.js"
import passport from 'passport'
const viewsRouter = express.Router();


viewsRouter.get('/', controller.get);
viewsRouter.get('/realTimeProducts', controller.getRealTimeProducts);
viewsRouter.get('/chat', controller.chat);
viewsRouter.get('/products',passport.authenticate('jwt-cookie',{ failureRedirect: '/login', session:false }),controller.products);
viewsRouter.get('/carts/:cid', controller.cart);
viewsRouter.get('/login',controller.login);
viewsRouter.get('/register', controller.register);
viewsRouter.get('/error-login', controller.errorLogin);
viewsRouter.get('/error-register', controller.errorRegister);
//primer llamado desde el front, pasara por el middleware de passport-github lo cual perdira autorizacion para acceder al perfil. 
//Cuando se acceda al perfil, passport enviara la info hacia el callback especificado
viewsRouter.get('/register-github', passport.authenticate('github', { scope: ['user:email'], session:false }));
//Este callback tiene que coincidir con el configurado en tu aplicacion en github, se encargara de hacer la redireccion final a la ventana del home.
viewsRouter.get('/profile-github', passport.authenticate('github', { scope: ['user:email'], session:false }), controller.githubResponse);

export default viewsRouter;

