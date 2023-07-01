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
    console.log('/realTimeProducts')
    // try{
        req.io.on('connection',socket => { //accion de conexion de websocket
            console.log('Connection established')
            socket.on('message', data => { //recibe "message" de cliente
                console.log(data)
            })
            res.render('realTimeProducts', {})
        })
        //  .on('productList', productList => { //accion de conexion de websocket
        //         console.log('Client connection established')
        //         console.log(producListOk)
        //         res.render('realTimeProducts', {producListOk})
        //         // socket.on('message', data => { 
        //         //     console.log(data)
        //         // })

        //         // let producListOk = socket.on('productList', producList => { 
        //         //     console.log('productList received from websocket',producList)
        //         //     return producList
        //         // }) 

        //         // if(producListOk.length > 0){
        //         //     res.render('realTimeProducts', {producListOk})
        //         // }else{
        //         //     res.status(404).send('No existen productos para listar') 
        //         // }
        //     })
        
        
    // }catch(err){
    //     console.log(err)
    //     res.status(404).send("Error")
    // }
})

export default viewsRouter;