import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import userRouter from './routes/user.router.js';
import handlebars from 'express-handlebars';
import {errorHandler} from './middlewares/errorHandler.js';
import {Server} from 'socket.io';
import express from 'express';
import './daos/mongodb/connection.js'
import __dirname from './utils.js';
import { getAll } from "./services/product.services.js";
import * as MsgService from "./services/message.services.js";
import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import connectionString from './daos/mongodb/connection.js'
import passport from 'passport';
// import './passport/local-strategy.js';
import './passport/github-strategy.js';
import "./passport/jwt-strategy.js";
import config from './config.js';

//Express
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})); 

//Middlewares
app.use(errorHandler);
app.use(cookieParser());

//Session mongoDb
// const mongoStoreOptions = {
//     store: MongoStore.create({
//         mongoUrl: connectionString,
//     }),
//     secret: PRIVATE_KEY,
//     cookie: {maxAge: 100000},
//     saveUninitialized: true,
//     resave: false
// }
// app.use(session(mongoStoreOptions)); 

//Passport
app.use(passport.initialize());
// app.use(passport.session());

console.log('Process arguments received: ',process.argv.slice(2));
//http Server
const httpServer = app.listen(config.port, () => {console.log(`Listening on PORT ${config.port}`)});


//socket Server
const io = new Server(httpServer); //Se crea el servidor websocket


io.on('connection', async(socket) => { // conexion de websocket

    console.log('Connection established id:',socket.id);

    socket.on('disconnect', () =>{
        console.log(socket.id, 'disconnect from server');
    })
    
    //Chat
    const response =  await MsgService.getAll()
    io.emit('messages', response.res);
    socket.on('newUser', (user)=>{
        console.log(`>${user} has logged in`);
    })
    socket.on('chat:message', async(msg) =>{
        await MsgService.create(msg)
        const response = await MsgService.getAll()
        io.emit('messages', response.res);
    })
    socket.on('chat:delete', async() =>{
        await MsgService.removeAll();
        const response = await MsgService.getAll()
        io.emit('messages', response.res);
    });
    socket.emit('msg', 'Welcome to chat');
    socket.on('newUser', (user)=>{
        socket.broadcast.emit('newUser', user); //llega a todos, menos al que inició sesión
    })
    socket.on('chat:typing', (user)=>{
        socket.broadcast.emit('chat:typing', user)
    })


    //RealTimeProducts
    let products = await getAll()
    const dataString = JSON.stringify(products.res);
    products = JSON.parse(dataString);
    io.emit('arrayProducts', products);

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
                //const productManager = new ProductManager(__dirname+"/files/products.json")
                let products = await getAll()
                const dataString = JSON.stringify(products.res);
                products = JSON.parse(dataString);
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
app.use('/api/users/',userRouter);
//views
app.use('/',viewsRouter);



