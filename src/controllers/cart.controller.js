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
        if (!req.user.cart) return res.status(403).json({error:'Unauthorized cart'})
        if (req.user.cart._id == cid) {
            const response = await service.addProduct(cid,pid);
            if (!response.error) res.status(200).json({result:response.res})
            else res.status(400).json({error:response.res})
        }else res.status(403).json({error:'Unauthorized cart'})
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

export const purchase = async(req, res, next) => {
    try{
        const cid = req.params.cid
        const email = req.user.email
        const userCid = req.user.cart
        if (userCid){
            if (userCid.id == cid) {
                const response = await service.purchase(cid,email);
                if (!response.error) {
                    const ticket = response.res
                    //Envia email de aviso
                    const body ={
                        email: req.user.email,
                        subject: 'Successful purchase!',
                        title: 'Here is yout ticket',
                        message: `- Code: ${ticket.code} <br> 
                        - Total: ${ticket.amount} <br>  
                        - Date: ${ticket.purchase_datetime.toDateString()}`
                    }
                    await fetch('http://localhost:8080/mail/send', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(body)
                    });
                    res.status(200).json({result:response.res})
                }
                else res.status(400).json({error:response.res})
            }else res.status(400).json({error:`cart id ${cid} is not user's cart`})
        }
        else res.status(400).json({error:"User does not have a cart, please add one before purchase"})
    }catch(err){
        next(err);
    }
};