import { getAll } from "../services/product.services.js";
import { create,getById } from "../services/cart.services.js";


export const register = async(req, res, next) => {
    try {
        res.render('register')
    } catch (error) {
        next(error);
    }
};

export const errorRegister = async(req, res, next) => {
    try {
        res.render('errorRegister')
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        res.render('login')
    } catch (error) {
        next(error);
    }
};

export const errorLogin = async(req, res, next) => {
    try {
        res.render('errorLogin')
    } catch (error) {
        next(error);
    }
};


// export const profile = async(req, res, next) => {
//     try {
//         res.render('profile')
//     } catch (error) {
//         next(error);
//     }
// };

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
        // let cart;
        // let ResCookie;
        // if (res.cookies){
        //     console.log('res.cookies.cartId ',res.cookies.cartId)
        //     ResCookie = await getById(res.cookies.cartId)
        //     cart = ResCookie.res.id
        // }else {
        //     ResCookie = await create({});
        //     cart = ResCookie.res.id
        //     console.log('cart id',ResCookie.res.id)
        // }
        
        const page = req.query.page
        let limit,sort,categoryF,statusF;
        const response = await getAll(limit, page, sort, categoryF, statusF)
        if (!response.error){
            let producList = response.res
            const dataString = JSON.stringify(producList);
            producList = JSON.parse(dataString);

            const user = {
                firstName: req.session.first_name,
                lastName: req.session.last_name,
                role: req.session.role
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