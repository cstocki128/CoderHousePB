import config from '../../config.js';
import __dirname from '../../utils.js';
const fileURL = __dirname+"/files/cart.json"
//Mongo 
import CartDaoMongoDb from "./mongodb/cart.dao.js";
import messageDaoMongoDb from "./mongodb/message.dao.js";
import ProductDaoMongoDb from "./mongodb/product.dao.js";
import UserDaoMongoDb from "./mongodb/user.dao.js";
import { initMongoDb } from "./mongodb/connection.js"

//Fs
import CartManager from "./filesystem/cart.dao.js";
import ProductManager from "./filesystem/product.dao.js"


let cartDao;
let messageDao;
let productDao;
let userDao;


switch (config.persistence) {
    case 'MONGO':
        cartDao = new CartDaoMongoDb();
        messageDao = new messageDaoMongoDb();
        productDao = new ProductDaoMongoDb();
        userDao = new UserDaoMongoDb();
        initMongoDb();
        break;
    case "FILE":
        cartDao = new CartManager(fileURL);
        //messageDao = new messageDaoMongoDb();
        productDao = new ProductManager(fileURL);
        userDao = new UserDaoMongoDb();
        initMongoDb();
        break;
    default:
        cartDao = new CartDaoMongoDb();
        messageDao = new messageDaoMongoDb();
        productDao = new ProductDaoMongoDb();
        userDao = new UserDaoMongoDb();
        break;
}

export default { cartDao, messageDao, productDao, userDao };