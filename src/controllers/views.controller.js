import { getAll } from "../services/product.services.js";
import { create,getById } from "../services/cart.services.js";
import { generateToken } from "../middlewares/jwt.js"
import {logger} from "../utils/logger.js"


export const register = async(req, res, next) => {
    try {
        logger.http('views.register executed')
        res.render('register')
    } catch (error) {
        next(error);
    }
};

export const errorRegister = async(req, res, next) => {
    try {
        logger.http('views.errorRegister executed')
        res.render('errorRegister',{})
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        logger.http('views.login executed')
        res.render('login')
    } catch (error) {
        next(error);
    }
};

export const errorLogin = async(req, res, next) => {
    try {
        logger.http('views.errorLogin executed')
        res.render('errorLogin')
    } catch (error) {
        next(error);
    }
};


export const githubResponse = async (req, res, next) => {
    try {
        logger.http('views.githubResponse executed')
    //   req.session.first_name = req.user.first_name;
    //   req.session.last_name =  req.user.last_name;
    //   req.session.role = req.user.role;
    //   res.redirect('/products')
        const user = req.user
        const accessToken = generateToken(user)
        res
            .cookie('token', accessToken, {httpOnly: true})
            .redirect('/products');
    } catch (error) {
        next(error.message);
    }
  };

export const get = async(req, res, next) => {
    try{
        logger.http('views.get executed')
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
        logger.http('views.getRealTimeProducts executed')
        res.render('realTimeProducts', {})
    }catch(err){
        next(err);
    }
}

export const chat = async(req, res, next) => {
    try{
        logger.http('views.chat executed')
        res.render('chat', {})
    }catch(err){
        next(err);
    }
}

export const products = async(req, res, next) => {
    try{
        logger.http('views.products executed')
        const page = req.query.page
        let limit,sort,categoryF,statusF;
        const response = await getAll(limit, page, sort, categoryF, statusF)
        if (!response.error){
            let producList = response.res
            const dataString = JSON.stringify(producList);
            producList = JSON.parse(dataString);
            const user = {
                firstName: req.user.first_name,
                lastName: req.user.last_name,
                role: req.user.role
            }
            res.render('products', {producList, user:user})
        }else{
            res.status(404).send(response.res)
        }
    }catch(err){
        next(err);
    }
}

export const cart = async(req, res, next) => {
    try{
        logger.http('views.cart executed')
        const response = await getById(req.params.cid)
        if (!response.error){
            let cart = response.res
            const dataString = JSON.stringify(cart);
            cart = JSON.parse(dataString);
            res.render('cart', {cart})
        }else{
            res.status(404).send(response.res)
        }
    }catch(err){
        next(err);
    }
}

export const resetPasswordMail = async (req, res, next) => {
    try {
        logger.http('views.resetPasswordMail executed')
        res.render('resetPasswordMail')
    } catch (error) {
        next(error.message);  
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        logger.http('views.resetPassword executed')
        res.render('resetPassword')
    } catch (error) {
        next(error.message);  
    }
}

export const errorResetPassword = async (req, res, next) => {
    try {
        logger.http('views.errorResetPassword executed')
        res.render('errorResetPassword')
    } catch (error) {
        next(error.message);  
    }
}