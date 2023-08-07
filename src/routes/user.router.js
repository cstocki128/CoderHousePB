import {Router} from "express";
import {login, register,logout} from "../controllers/user.controller.js"
const userRouter = Router();

userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/logout', logout);

export default userRouter;