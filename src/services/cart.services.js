import __dirname from '../utils.js';
//import CartDaoFS from '../daos/filesystem/cart.dao.js';
import CartDaoMongoDb from '../daos/mongodb/cart.dao.js';
//const cartDao = new CartDaoFS(__dirname+"/files/cart.json");
const cartDao = new CartDaoMongoDb();


export const getById = async(id) => {
    try {
        const response = await cartDao.getCart(id)
        if (response != null){
            return {error:false, res:response};
        }else{
            return {error:true, res:'Cart not found'}
        }

    } catch (err) {
        const error = `cart.getById service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const create = async(cart) => {
    try {
        const response = await cartDao.addCart(cart)
        if (response === null){
            return {error:false, res:'Cart added succesfully'}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `cart.create service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const addProduct= async(cid,pid) => {
    try {
        const response = await cartDao.addProductToCart(cid,pid)
        if (response === null){
            return {error:false, res:`Product id:${pid} added to Cart id:${cid} succesfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `cart.addProductToCart service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const updProducts = async(cid,products) => {
    try {
        const response = await cartDao.updProducts(cid,products)
        if (response === null){
            return {error:false, res:`Products updated in cart id:${cid} succesfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }  
    } catch (err) {
        const error = `cart.updProducts service error: ${err.message}`;
        return {error:true, res:error}; 
    }
}

export const updProduct = async(cid,pid,quantity) => {
    try {
        const response = await cartDao.updProduct(cid,pid,quantity)
        if (response === null){
            return {error:false, res:`Product id:${pid} updated in cart id:${cid} succesfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }  
    } catch (err) {
        const error = `cart.updProducts service error: ${err.message}`;
        return {error:true, res:error}; 
    }
}

export const deleteProducts = async(cid) => {
    try {
        const response = await cartDao.deleteProducts(cid)
        if (response === null){
            return {error:false, res:`Products deleted in cart id:${cid} succesfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }  
    } catch (err) {
        const error = `cart.deleteProducts service error: ${err.message}`;
        return {error:true, res:error}; 
    }
}

export const deleteProduct = async(cid,pid) => {
    try {
        const response = await cartDao.deleteProduct(cid,pid)
        if (response === null){
            return {error:false, res:`Product ${pid} deleted in cart id:${cid} succesfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }  
    } catch (err) {
        const error = `cart.deleteProducts service error: ${err.message}`;
        return {error:true, res:error}; 
    }
}