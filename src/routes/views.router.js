import express from "express";
import * as controller from "../controllers/views.controller.js"
import validateLogin from "../middlewares/validateLogin.js"
const viewsRouter = express.Router();


viewsRouter.get('/', controller.get);
viewsRouter.get('/realTimeProducts', controller.getRealTimeProducts);
viewsRouter.get('/chat', controller.chat);
viewsRouter.get('/products',validateLogin ,controller.products);
viewsRouter.get('/carts/:cid', controller.cart);
viewsRouter.get('/login', controller.login);
viewsRouter.get('/register', controller.register);
viewsRouter.get('/error-login', controller.errorLogin);
viewsRouter.get('/error-register', controller.errorRegister);
export default viewsRouter;

// viewsRouter.get('/', async(req,res) =>{
//     try{
//         let producList = await productManager.getProducts()
//         res.render('home', {producList})
//     }catch(err){
//         res.status(404).send(err)
//     }
// })

// viewsRouter.get('/realTimeProducts', (req,res) =>{
//     try{
//         res.render('realTimeProducts', {})
           
//     }catch(err){
//         console.log(err)
//         res.status(404).send("Error")
//     }
// }) 

