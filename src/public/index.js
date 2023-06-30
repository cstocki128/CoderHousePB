//Hacemos de cliente
const socket = io(); //Se instancia a socket.io asi por convencion del lado del cliente
socket.emit('message', 'Me estoy comunicando desde un websocket');

