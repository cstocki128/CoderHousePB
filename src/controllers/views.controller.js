import { getAll } from "../services/product.services.js";

export const get = async(req, res, next) => {
    try{
        const response = await getAll()
        if (!response.error){
            const producList = response.res
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