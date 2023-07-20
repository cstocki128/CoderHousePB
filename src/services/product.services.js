import ProductDaoFS from '../daos/filesystem/product.dao.js';
import __dirname from '../utils.js';
const prodDao = new ProductDaoFS(__dirname+"/files/products.json");


export const getAll = async() => {
    try {
        const products = await prodDao.getProducts()
        if (products.length > 0) return products
        else return false;
    } catch (err) {
        console.log(err);
    }
}

export const getById = async(id) => {
    try {
        const product = await prodDao.getProductById(id)
        if ( typeof product === 'object') {
            return product;
        }else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

export const create = async() => {
    try {
        
    } catch (err) {
        console.log(err);
    }
}

export const update = async() => {
    try {
        
    } catch (err) {
        console.log(err);
    }
}

export const remove = async() => {
    try {
        
    } catch (err) {
        console.log(err);
    }
}