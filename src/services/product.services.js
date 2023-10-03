import ProductRepository from "../persistence/repository/product/product.repository.js"
import {logger} from "../utils/logger.js"
import {mockProducts} from "../utils.js"
const productRepository = new ProductRepository();

export const getAll = async(limit, page, sort, categoryF, statusF) => {
    try {
        const response =  await productRepository.dao.getProducts(limit, page, sort, categoryF, statusF)
        return {error:false, res:response}
    } catch (err) {
        throw new Error(`product.getAll service error: ${err.message}`);
    }
}

export const getById = async(id) => {
    try {
        const response = await productRepository.dao.getProductById(id)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            logger.error(`product.getById ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        throw new Error(`product.getById service error: ${err.message}`);
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
            logger.error(`product.create ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        throw new Error(`product.create service error: ${err.message}`);
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
            logger.error(`product.update ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        throw new Error(`product.update service error: ${err.message}`);
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
            logger.error(`product.remove ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        throw new Error(`product.remove service error: ${err.message}`);
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
        throw new Error(`product.mockingProducts service error: ${err.message}`);
    }
}
