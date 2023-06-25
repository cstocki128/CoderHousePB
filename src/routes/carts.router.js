import {Router} from "express";
import CartManager from "../managers/CartManager.js";

const cartRouter = Router();
const cart = new CartManager('./src/files/carts.json');

cartRouter.get('/:cid', async(req,res) =>{
    try{
        let jsonCart = await cart.getCart(parseInt(req.params.cid))
        if (jsonCart !== null) {
            res.status(200).json(jsonCart.products);
        }else {
            res.status(400).send({error: 'Cart not found'})
        }
    } catch(err){
        console.log(err);
        res.status(500).send({error: err});
    }
})

export default cartRouter;

