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

// cartRouter.get('/:cid', async(req,res) =>{
//     try{
//         let jsonCart = await cartManager.getCart(parseInt(req.params.cid))
//         if (jsonCart !== null) {
//             res.status(200).json(jsonCart.products);
//         }else {
//             res.status(400).send({error: 'Cart not found'})
//         }
//     } catch(err){
//         console.log('cartRouter.get Error',err);
//         res.status(500).send({error: String(err)});
//     }
// })

// cartRouter.post('/', async(req, res) => {
//     try{
//         let error = await cartManager.addCart(req.body)
//         if (error === null){
//             res.status(200).json({message: 'Cart added succesfully'})
//         }else {
//             res.status(400).send({error: String(error)})
//         }
//     }catch(err){
//         console.log('cartRouter.post Error',err);
//         res.status(500).send({error: String(err)});
//     }
// })

// cartRouter.post('/:cid/product/:pid', async(req, res) => {
//     try{
//         let cid = parseInt(req.params.cid)
//         let pid = parseInt(req.params.pid)
//         let error = await cartManager.addProductToCart(cid,pid)
//         if (error === null){
//             res.status(200).json({message: `Product id:${pid} added to Cart id:${cid} succesfully`})
//         }else {
//             res.status(400).send({error: String(error)})
//         }
//     }catch(err){
//         console.log('cartRouter.post product Error',err);
//         res.status(500).send({error: String(err)});
//     }
// })



