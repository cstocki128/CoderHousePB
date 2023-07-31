import { getAll } from "../services/product.services.js";

export const get = async(req, res, next) => {
    try{
        const response = await getAll()
        if (!response.error){
            let producList = response.res
            const dataString = JSON.stringify(producList.payloads);
            producList = JSON.parse(dataString);
            res.render('home', {producList})
        }else{
            
            res.status(404).send(response.res)
        }
    }catch(err){
        next(err);
    }
}

export const getRealTimeProducts = async(req, res, next) => {
    try{
        res.render('realTimeProducts', {})
    }catch(err){
        next(err);
    }
}

export const chat = async(req, res, next) => {
    try{
        res.render('chat', {})
    }catch(err){
        next(err);
    }
}

export const products = async(req, res, next) => {
    try{
        res.render('products', {})
    }catch(err){
        next(err);
    }
}