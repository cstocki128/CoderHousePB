import * as service from "../services/user.services.js";
import { generateToken } from "../middlewares/jwt.js"
import {logger} from "../utils/logger.js"


export const register = async(req, res, next) => {
    try {
        logger.http('user.register executed')
        const response = await service.register(req.body);
        if (response.error) res.redirect('/error-register')
        else res.redirect('/login')
    } catch (error) {
        next(error);
    }
    
}

export const login = async(req, res, next) => {
    try {
        logger.http('user.login executed')
        const response = await service.login(req.body);
        if (response.error) res.redirect('/error-login')
        else{
            const accessToken = generateToken(response.res)
            res
                .cookie('token', accessToken, {httpOnly: true})
                .redirect('/products');
        };    
    } catch (error) {
        next(error);
    }
    

}
 
export const logout = async(req, res) => {
    try {
        logger.http('user.logout executed')
        res 
            .clearCookie('token')
            .redirect('/login')
    } catch (error) {
        next(error);
    }
    
};

export const addCart = async(req, res) => {
    try {
        logger.http('user.addCart executed')
        const {email, cid} = req.body;
        if (!email || !cid) res.status(400).json('Invalid email or CartId')
        else {
            const response = await service.addCart(email,cid);
            if(response.error) res.status(400).json({error: response.res})
            else res.json({result:response.res})

        };  
    } catch (error) {
        next(error);
    }
    
};

export const current = async(req, res) => {
    try {
        logger.http('user.current executed')
        if (req.user) { res.json(await service.current(req.user)) }
        else res.status(404).send({error: 'Not logged in'});  
    } catch (error) {
        next(error);
    }
    
};

export const authenticate = async(req, res, next) => {
   try {
        logger.http('user.authenticate executed')
        const {email, password} = req.body
        if (!email || !password) return res.status(400).send({error: 'Invalid email or password'}); 
        const response = await service.login(req.body);
        if (response.error) return res.status(404).send({error: response.res});
        const accessToken = generateToken(response.res)
        res.json({token:accessToken});
   } catch (error) {
        next(error) 
   }
};

export const loggerTest = async(req, res, next) => {
    try {
        logger.http('user.loggerTest executed')
        const response =  await service.loggerTest()
        if(response.error) return res.status(400).json({error: response.res})
        else res.json({result:response.res})
    } catch (error) {
        next(error) 
    }
};

export const setPermissions = async(req, res, next) => {
    try {
        logger.http('user.setPermissions executed')
        const user = req.params.uid
        const response =  await service.setPermissions(user)
        if(response.error) return res.status(400).json({error: response.res})
        else res.json({result:response.res})
    } catch (error) {
        next(error) 
    }
};

export const updatePass = async(req, res, next) => {
    try {
        logger.http('user.updatePass executed')
        const {email, newPass} = req.body;
        const response = await service.updatePass(email, newPass)
        if (response.error) return res.redirect('/ErrorResetPassword')
        res
            .clearCookie('tokenpass')
            .redirect('/login')
       
    } catch (error) {
        next(error) 
    }
};

export const addDocuments = async (req, res, next) => {
    try {
        logger.http('user.addDocuments executed')  
        const Uid = req.params.uid;
        if (!Uid) return res.status(400).json({error: 'User id not provided'})
        const {fileName, type} = req.body;
        const files = req.files;
    } catch (error) {
        next(error) 
    }
};