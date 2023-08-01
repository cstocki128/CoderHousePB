import __dirname from '../utils.js';
//import ProductDaoFS from '../daos/filesystem/product.dao.js';
import ProductDaoMongoDb from '../daos/mongodb/product.dao.js';
//const prodDao = new ProductDaoFS(__dirname+"/files/products.json");
const prodDao = new ProductDaoMongoDb();

export const getAll = async(limit, page, sort, categoryF, statusF) => {
    try {
        const response =  await prodDao.getProducts(limit, page, sort, categoryF, statusF)
        return {error:false, res:response}
    } catch (err) {
        const error = `product.getAll service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const getById = async(id) => {
    try {
        const response = await prodDao.getProductById(id)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `product.getById service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const create = async(prod) => {
    try {
        const response = await prodDao.addProduct(prod)
        if (response === null) {
            return {error:false, res:'Product added successfully'}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `product.create service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const update = async(id,prod) => {
    try {
        const response = await prodDao.updateProduct(id,prod)
        if (response === null) {
            return {error:false, res:`Product ${id} updated successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `product.update service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const remove = async(id) => {
    try {
        const response = await prodDao.deleteProduct(id)
        if (response === null) {
            return {error:false, res:`Product ${id} removed successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `product.remove service error: ${err.message}`;
        return {error:true, res:error};
    }
}
