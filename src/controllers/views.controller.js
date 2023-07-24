import { getAll } from "../services/product.services.js";

export const get = async(req, res, next) => {
    try{
        const response = await getAll()
        if (!response.error){
            let producList = response.res
            console.log(producList)
            const dataString = JSON.stringify(producList);
            producList = JSON.parse(dataString);
            console.log(producList)
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