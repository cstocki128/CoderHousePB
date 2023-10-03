import {Router} from "express";
import * as controller from "../controllers/cart.controller.js"
import passport from "passport"
const cartRouter = Router();

cartRouter.get('/:cid',passport.authenticate('jwt-header',{session:false}), controller.getById);
cartRouter.post('/',passport.authenticate('jwt-header',{session:false}), controller.create);
cartRouter.post('/:cid/products/:pid',passport.authenticate('jwt-header',{session:false}), controller.addProduct);
cartRouter.post('/:cid/purchase',passport.authenticate('jwt-header',{session:false}), controller.purchase);
cartRouter.put('/:cid',passport.authenticate('jwt-header',{session:false}), controller.updProducts);
cartRouter.put('/:cid/products/:pid',passport.authenticate('jwt-header',{session:false}), controller.updProduct);
cartRouter.delete('/:cid/products/:pid',passport.authenticate('jwt-header',{session:false}), controller.deleteProduct);
cartRouter.delete('/:cid',passport.authenticate('jwt-header',{session:false}), controller.deleteProducts);

export default cartRouter;





