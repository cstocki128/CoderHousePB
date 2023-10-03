import {Router} from 'express';
import * as controller from "../controllers/product.controller.js"
import validateAdmin from "../middlewares/validateAdmin.js"
import passport from 'passport'
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 
const productsRouter = Router();

productsRouter.get('/',passport.authenticate('jwt-header',{session:false}), controller.getAll);
productsRouter.get('/:pid',passport.authenticate('jwt-header',{session:false}), controller.getById);
productsRouter.get('/mocks/mockingProducts',passport.authenticate('jwt-header',{session:false}), controller.mockingProducts);
productsRouter.post('/',passport.authenticate('jwt-header',{session:false}),validateAdmin, controller.create); //,
productsRouter.put('/:pid',passport.authenticate('jwt-header',{session:false}),validateAdmin, controller.update);
productsRouter.delete('/:pid',passport.authenticate('jwt-header',{session:false}),validateAdmin, controller.remove);

export default productsRouter;

