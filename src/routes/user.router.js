import {Router} from "express";
import {login, register,logout,current,authenticate,addCart,loggerTest,setPermissions,updatePass,addDocuments} from "../controllers/user.controller.js"
import passport from 'passport'
const userRouter = Router();

//userRouter.post('/login',passport.authenticate('login',{ failureRedirect: '/error-login' }), login);
//userRouter.post('/register',passport.authenticate('register',{ failureRedirect: '/error-register' }), register);
userRouter.post('/login', login);
userRouter.post('/register',register);
userRouter.post('/addCart',passport.authenticate('jwt-header',{session:false}),addCart);
userRouter.put('/premium/:uid',passport.authenticate('jwt-header',{session:false}),setPermissions);
userRouter.get('/logout', logout);
userRouter.post('/updatePass', updatePass);
userRouter.post('/:uid/documents', addDocuments);
userRouter.post('/authenticate', authenticate);
userRouter.get('/current',passport.authenticate('jwt-header',{session:false}), current);
userRouter.get('/loggerTest',passport.authenticate('jwt-header',{session:false}), loggerTest);


export default userRouter;