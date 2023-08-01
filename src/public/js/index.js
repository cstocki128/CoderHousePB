const socket = io(); //Se instancia a socket.io asi por convencion del lado del cliente

//form management
const form = document.getElementById('form');
const pcode = document.getElementById('code');
const ptitle = document.getElementById('title');
const pdescription = document.getElementById('description');
const pprice = document.getElementById('price');
const pstock = document.getElementById('stock');
const pstatus = document.getElementById('status');
const pcategory = document.getElementById('category');
const pproducts = document.getElementById('products');
const perror = document.getElementById('error');

form.onsubmit = (e) => {
    e.preventDefault();
    const code = pcode.value;
    const title = ptitle.value; 
    const description = pdescription.value; 
    const price = pprice.value; 
    const stock = pstock.value; 
    const status = pstatus.checked;
    const category = pcategory.value;
    socket.emit('addProduct',{code,title,description,price,stock,status,category})
}

//socket.emit('getProducts')

socket.on('arrayProducts', (productsArray) => {
    perror.innerHTML = ''
    let infoProducts = '';
    productsArray.payloads.forEach((product) => {
        infoProducts += `Product: ${product.code} - ${product.title} <br>`
    });
    pproducts.innerHTML = infoProducts;
    
 })

 socket.on('AddProdyctError', (errordsc) => {
    perror.innerHTML = 'Error: '+errordsc
 })