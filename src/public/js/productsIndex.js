//const socket = io();
import config from '../../config.js'

let url;
if (config.host == 'localhost') url = `${config.protocol}://${config.host}:${config.port}`
else url = `${config.protocol}://${config.host}`

const btnPrev = document.getElementById('send');
const btnNext = document.getElementById('delete');
const output = document.getElementById('output');


function prevPage(page) {
    if (page) {
        location.href=`${url}/products?page=${page}`
    }else alert('No previous page available')
    
}

function nextPage(page) {
    if (page) {
        location.href=`${url}/products?page=${page}`
    }else alert('No next page available')
}


// const addProdToCart = (pid) => {

// };