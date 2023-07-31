const socket = io();

const btnPrev = document.getElementById('send');
const btnNext = document.getElementById('delete');
const output = document.getElementById('output');

// const addPrev = () => {
//     if (productsArray.prevPage) {
//         socket.emit('btnPage', productsArray.prevPage)
//     }else alert('No prev page available')
     
// }
// const addNext = () => {
//     if (productsArray.nextPage) {
//         socket.emit('btnPage', productsArray.nextPage) 
//     }else alert('No next page available')
     
// }



socket.on('arrayProducts', (productsArray)=>{
    // btnPrev.removeEventListener('click',addNext)
    // btnPrev.removeEventListener('click',addPrev)
    
    btnPrev.addEventListener('click', function addPrev (){
        if (productsArray.prevPage) {
            socket.emit('btnPage', productsArray.prevPage)
        }else alert('No prev page available')
        btnPrev.removeEventListener('click',addPrev)
    },{once: true});
    btnNext.addEventListener('click', function addNext (){
        if (productsArray.nextPage) {
            socket.emit('btnPage', productsArray.nextPage) 
        }else alert('No next page available')
        btnNext.removeEventListener('click',addNext)
    },{once:true});
    
    const productsRender = productsArray.payloads.map((product)=>{
        return `<p>Product: ${product.code} - ${product.title} </p><button id="sendProd" onclick="addProdToCart(${product.Id})">Add to cart</button>`
    }).join(' ')
    output.innerHTML = productsRender
});

const createNewCart = () => {
 //socket.emit('createNewCart')
};
//createNewCart();

const addProdToCart = (pid,cid) => {

};