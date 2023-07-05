import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import express from 'express';
import __dirname from './utils.js';
import ProductManager from "./managers/product.manager.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})); 

//http Server
const httpServer = app.listen(8080, () => {console.log('Listening on PORT 8080')});
//socket Server
const io = new Server(httpServer); //Se crea el servidor websocket


io.on('connection', socket => { //accion de conexion de websocket
    console.log('Connection established user:',socket.id);

    socket.on('disconnect', () =>{
        console.log(socket.id, 'disconnect from server');
    })
    
    
    socket.on('getProducts', async() => {
        try{
            const productManager = new ProductManager(__dirname+"/files/products.json")
            let products = await productManager.getProducts()
            io.emit('arrayProducts', products);
        }catch(err){
            console.log(err);
        }
    })
    socket.on('addProduct', async(product) => { //recibe "message" de cliente
        try{
            let response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(product)
              });

            if (response.ok){
                const productManager = new ProductManager(__dirname+"/files/products.json")
                let products = await productManager.getProducts()
                console.log(products)
                io.emit('arrayProducts', products);
            }else{
                io.emit('AddProdyctError', response.statusText)
            }
            //io.emit('arrayProducts',products);
        }catch(err){
            console.log(err);
        }
    })
})



//handlebars
app.engine('handlebars', handlebars.engine());     //Inicializa motor
app.set('views', __dirname+'/views')          //setea carpeta de views
app.set('view engine', 'handlebars');           //setea motor inicializado anteriormente
app.use(express.static(__dirname+'/public'))  //setea carpeta estatica public

//apis
app.use('/api/products/',productsRouter);
app.use('/api/carts/',cartsRouter);
//views
app.use('/',viewsRouter);



