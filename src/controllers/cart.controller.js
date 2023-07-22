import * as service from "../services/cart.services.js";

export const getById = async(req, res, next) => {
    try{
        const id = parseInt(req.params.cid)
        const response = await service.getById(id);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};

export const create = async(req, res, next) => {
    try{
        const cart = req.body
        const response = await service.create(cart);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};

export const addProduct= async(req, res, next) => {
    try{
        let cid = parseInt(req.params.cid)
        let pid = parseInt(req.params.pid)
        const response = await service.addProduct(cid,pid);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};