import * as service from "../services/cart.services.js";

export const getById = async(req, res, next) => {
    try{
        const id = req.params.cid
        const response = await service.getById(id);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const create = async(req, res, next) => {
    try{
        const cart = req.body
        const response = await service.create(cart);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const addProduct= async(req, res, next) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const response = await service.addProduct(cid,pid);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const updProducts= async(req, res, next) => { 
    try{
        const cid = req.params.cid
        const products = req.body
        const response = await service.updProducts(cid, products);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const updProduct= async(req, res, next) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = Number(req.body.quantity)
        if (!quantity || quantity < 0 || !Number.isInteger(quantity)){
            res.status(400).json({error:'Quantity must be a positive number'})
        }else {
            const response = await service.updProduct(cid,pid,quantity);
            if (!response.error) res.status(200).json({result:response.res})
            else res.status(400).json({error:response.res})
        }
    }catch(err){
        next(err);
    }
};

export const deleteProduct= async(req, res, next) => {
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const response = await service.deleteProduct(cid, pid);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const deleteProducts= async(req, res, next) => {
    try{
        let cid = req.params.cid
        const response = await service.deleteProducts(cid);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};