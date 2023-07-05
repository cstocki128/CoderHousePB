import express from "express";
import ProductManager from "../managers/product.manager.js";

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/files/products.json")

viewsRouter.get('/', async(req,res) =>{
    try{
        let producList = await productManager.getProducts()
        res.render('home', {producList})
    }catch(err){
        res.status(404).send(err)
    }
})

viewsRouter.get('/realTimeProducts', (req,res) =>{
    try{
        res.render('realTimeProducts', {})
           
    }catch(err){
        console.log(err)
        res.status(404).send("Error")
    }
}) 

export default viewsRouter;