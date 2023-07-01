import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';
import express from 'express';
import __dirname from './utils.js';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})); 

//http Server
const httpServer = app.listen(8080, () => {console.log('Listening on PORT 8080')});
//socket Server
const io = new Server(httpServer); //Se crea el servidor websocket
app.use(function(request, response, next) {
    request.io = io;
    next();
});
// socketServer.on('connection',socket => { //accion de conexion de websocket
//     console.log('Connection established')
//     socket.on('message', data => { //recibe "message" de cliente
//         console.log(data)
//     })
// })


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



