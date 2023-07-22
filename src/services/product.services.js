import ProductDaoFS from '../daos/filesystem/product.dao.js';
import __dirname from '../utils.js';
const prodDao = new ProductDaoFS(__dirname+"/files/products.json");


export const getAll = async() => {
    try {
        const products =  await prodDao.getProducts()
        return {error:false, res:products}
    } catch (err) {
        const error = `product.getAll service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const getById = async(id) => {
    try {
        const product = await prodDao.getProductById(id)
        if ( typeof product === 'object') {
            return {error:false,res:product}
        }else {
            return {error:true,res:product}
        }
    } catch (err) {
        const error = `product.getById service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const create = async(prod) => {
    try {
        const res = await prodDao.addProduct(prod)
        if (res === null) {
            return {error:false, res:'Product added successfully'}
        }else if(typeof res === 'object'){
            return {error:false, res:res}
        }else{
            return {error:true, res:res}
        }
    } catch (err) {
        const error = `product.create service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const update = async(id,prod) => {
    try {
        const res = await prodDao.updateProduct(id,prod)
        if (res === null) {
            return {error:false, res:`Product ${id} updated successfully`}
        }else if(typeof res === 'object'){
            return {error:false, res:res}
        }else{
            return {error:true, res:res}
        }
    } catch (err) {
        const error = `product.update service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const remove = async(id) => {
    try {
        const res = await prodDao.deleteProduct(id)
        if (res === null) {
            return {error:false, res:`Product ${id} removed successfully`}
        }else{
            return {error:true, res:res}
        }
    } catch (err) {
        const error = `product.remove service error: ${err.message}`;
        return {error:true, res:error};
    }
}
