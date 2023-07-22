import CartDaoFS from '../daos/filesystem/cart.dao.js';
import __dirname from '../utils.js';
const cartDao = new CartDaoFS(__dirname+"/files/cart.json");


export const getById = async(id) => {
    try {
        const res = await cartDao.getCart(id)
        if (res != null){
            return {error:false, res:res};
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
        const res = await cartDao.addCart(cart)
        if (res === null){
            return {error:false, res:'Cart added succesfully'}
        }else {
            return {error:true, res:res}
        }
    } catch (err) {
        const error = `cart.create service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const addProduct= async(cid,pid) => {
    try {
        const res = await cartDao.addProductToCart(cid,pid)
        if (res === null){
            return {error:false, res:`Product id:${pid} added to Cart id:${cid} succesfully`}
        }else {
            return {error:true, res:res}
        }
    } catch (err) {
        const error = `cart.addProductToCart service error: ${err.message}`;
        return {error:true, res:error};
    }
}
