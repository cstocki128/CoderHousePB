//const socket = io();
import config from '../../config.js'

const btnPrev = document.getElementById('send');
const btnNext = document.getElementById('delete');
const output = document.getElementById('output');


function prevPage(page) {
    if (page) {
        location.href=`${config.protocol}://${config.host}:${config.port}/products?page=${page}`
    }else alert('No previous page available')
    
}

function nextPage(page) {
    if (page) {
        location.href=`${config.protocol}://${config.host}:${config.port}/products?page=${page}`
    }else alert('No next page available')
}


// const addProdToCart = (pid) => {

// };