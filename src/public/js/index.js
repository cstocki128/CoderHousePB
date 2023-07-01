//Hacemos de cliente
const productsRouter = Router();
const productList = new ProductManager("./src/files/products.json")

const socket = io(); //Se instancia a socket.io asi por convencion del lado del cliente
socket.emit('message', 'Me estoy comunicando desde un websocket');

let producList = productManager.getProducts()
socket.emit('productList', producList);

