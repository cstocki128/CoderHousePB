//const socket = io();

const btnPrev = document.getElementById('send');
const btnNext = document.getElementById('delete');
const output = document.getElementById('output');


function prevPage(page) {
    if (page) {
        location.href=`http://localhost:8080/products?page=${page}`
    }else alert('No previous page available')
    
}

function nextPage(page) {
    if (page) {
        location.href=`http://localhost:8080/products?page=${page}`
    }else alert('No next page available')
}


// const addProdToCart = (pid) => {

// };