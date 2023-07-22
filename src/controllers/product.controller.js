import * as service from "../services/product.services.js";


export const getAll = async(req, res, next) => {
    try{
        const limit = parseInt(req.query.limit)
        const response = await service.getAll();
        if (!response.error) {
            if( !limit || limit == 0 || !Number.isInteger(limit)) { res.status(200).json({result:response.res})}
            else {
                products = response.res
                let productsFilter = products.filter((product) => {
                    return productsFilter.indexOf(product) < limit
                })
                res.status(200).json({result:productsFilter})
            }
        }else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};

export const getById = async(req, res, next) => {
    try{
        const id = parseInt(req.params.pid)
        const response = await service.getById(id);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};

export const update = async(req, res, next) => {
    try{
        const id = parseInt(req.params.pid)
        const prod = req.body
        const response = await service.update(id,prod);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};

export const create = async(req, res, next) => {
    try{
        const prod = req.body
        const response = await service.create(prod);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};

export const remove = async(req, res, next) => {
    try{
        const id = parseInt(req.params.pid)
        const response = await service.remove(id);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        console.error(err)
        //next(err);
    }
};