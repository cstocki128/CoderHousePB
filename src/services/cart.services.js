import CartRepository from "../persistence/repository/cart/cart.repository.js"
const cartRepository = new CartRepository();

export const getById = async(id) => {
    try {
        const response = await cartRepository.dao.getCart(id)
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
        const response = await cartRepository.dao.addCart(cart)
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
        const response = await cartRepository.dao.addProductToCart(cid,pid)
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
        const response = await cartRepository.dao.updProducts(cid,products)
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
        const response = await cartRepository.dao.updProduct(cid,pid,quantity)
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
        const response = await cartRepository.dao.deleteProducts(cid)
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
        const response = await cartRepository.dao.deleteProduct(cid,pid)
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

export const purchase = async(cid,email) => {
    try {
        const response = await cartRepository.dao.purchase(cid,email)
        if (response === null){
            return {error:false, res:`Cart ${cid} purchased successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else {
            return {error:true, res:response}
        }  
    } catch (err) {
        const error = `cart.purchase service error: ${err.message}`;
        return {error:true, res:error}; 
    }
}