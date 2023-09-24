import ProductRepository from "../persistence/repository/product/product.repository.js"
import {mockProducts} from "../utils.js"
const productRepository = new ProductRepository();

export const getAll = async(limit, page, sort, categoryF, statusF) => {
    try {
        const response =  await productRepository.dao.getProducts(limit, page, sort, categoryF, statusF)
        return {error:false, res:response}
    } catch (err) {
        const error = `product.getAll service error: ${err.message}`;
        return {error:true, res:error};
    }
}

export const getById = async(id) => {
    try {
        const response = await productRepository.dao.getProductById(id)
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
        const response = await productRepository.dao.addProduct(prod)
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
        const response = await productRepository.dao.updateProduct(id,prod)
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
        const response = await productRepository.dao.deleteProduct(id)
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

export const mockingProducts = async(quantity) => {
    try {
        if (!quantity) quantity = 100;
        const response = await mockProducts(quantity);
        if (response === null || response.length < 1) {
            return {error:true, res:`Error at mocking products`};
        }else{
            return {error:false, res:response};
        }
    } catch (err) {
        const error = `product.remove service error: ${err.message}`;
        return {error:true, res:error};
    }
}
