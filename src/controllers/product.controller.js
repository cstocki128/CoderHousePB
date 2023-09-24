import * as service from "../services/product.services.js";


export const getAll = async(req, res, next) => {
    try{
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page ?? 1) 
        const categoryF = req.query.category
        let statusF;
        if (req.query.status == 'true') {statusF = true} else if (req.query.status == 'false') {statusF = false};
        const sort = req.query.sort
        const response = await service.getAll(limit, page, sort, categoryF, statusF);
        if (!response.error) {
            const PaginatedResponse = response.res
            PaginatedResponse.status =  'Success'
            let newLink = `http://localhost:8080/api/products?`
            if (limit) newLink += `limit=${limit}`
            if (sort) newLink += `&sort=${sort}`
            if (statusF != undefined) newLink += `&status=${statusF}`
            if (categoryF) newLink += `&category=${categoryF}`
            if (PaginatedResponse.hasPrevPage == true) {PaginatedResponse.prevLink = `${newLink}&page=${page-1}`} else {PaginatedResponse.prevLink = null}
            if (PaginatedResponse.hasNextPage == true) {PaginatedResponse.nextLink = `${newLink}&page=${page+1}` } else {PaginatedResponse.nextLink = null}
            res.status(200).json(PaginatedResponse)        
        }else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const getById = async(req, res, next) => {
    try{
        const id = req.params.pid
        const response = await service.getById(id);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const update = async(req, res, next) => {
    try{
        const id = req.params.pid
        const prod = req.body
        const response = await service.update(id,prod);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const create = async(req, res, next) => {
    try{
        const prod = req.body
        const response = await service.create(prod);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const remove = async(req, res, next) => {
    try{
        const id = req.params.pid
        const response = await service.remove(id);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};

export const mockingProducts = async(req, res, next) => {
    try{
        const quantity = parseInt(req.query.quantity);
        const response = await service.mockingProducts(quantity);
        if (!response.error) res.status(200).json({result:response.res})
        else res.status(400).json({error:response.res})
    }catch(err){
        next(err);
    }
};