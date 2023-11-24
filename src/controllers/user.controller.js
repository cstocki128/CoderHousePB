import * as service from "../services/user.services.js";
import { generateToken } from "../middlewares/jwt.js"
import {logger} from "../utils/logger.js"
import config from "../config.js";


export const register = async(req, res, next) => {
    try {
        logger.http('user.register executed')
        const response = await service.register(req.body);
        if (response.error) res.redirect('/error-register')
        else res.redirect('/login')
    } catch (error) {
        next(error.message);
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
        next(error.message);
    }
    

}
 
export const logout = async(req, res,next) => {
    try {
        logger.http('user.logout executed')
        res 
            .clearCookie('token')
            .redirect('/login')
    } catch (error) {
        next(error.message);
    }
    
};

export const addCart = async(req, res,next) => {
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
        next(error.message);
    }
    
};

export const current = async(req, res,next) => {
    try {
        logger.http('user.current executed')
        if (req.user) { 
            const response = await service.current(req.user)
            if (!response.error) res.json(response.res) 
            else res.status(400).send(response.res)
        }
        else res.status(404).send({error: 'Not logged in'});  
    } catch (error) {
        next(error.message);
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
        next(error.message) 
   }
};

export const loggerTest = async(req, res, next) => {
    try {
        logger.http('user.loggerTest executed')
        const response =  await service.loggerTest()
        if(response.error) return res.status(400).json({error: response.res})
        else res.json({result:response.res})
    } catch (error) {
        next(error.message) 
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
        next(error.message) 
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
        next(error.message) 
    }
};

export const addDocuments = async (req, res, next) => {
    try {
        logger.http('user.addDocuments executed')  
        const Uid = req.params.uid;
        if (!Uid) return res.status(400).json({error: 'User id not provided'})
        const files = req.files;
        const response = await service.addDocuments(Uid, files)
        if(response.error) return res.status(400).json({error: response.res})
        else res.json({result:response.res})
    } catch (error) {
        next(error.message) 
    }
};

export const getAll = async(req, res, next) => {
    try {
        logger.http('user.getAll executed')
        const response =  await service.getAll()
        if (!response.error) return res.status(200).json({result: response.res})
        else res.status(404).send({error: response.res});  
    } catch (error) {
        next(error.message);
    }
};


export const deleteAllOff = async(req, res, next) => {
    try {
        logger.http('user.deleteAllOff executed')
        const conData = {
            protocol: req.protocol,
            host: req.get('host'),
            pathname: req.originalUrl
          }
        const response =  await service.deleteAllOff()
        if (!response.error) {
            const usersDeleted = response.res
            usersDeleted.forEach(async user => {
                const body ={
                    email: user.email,
                    subject: 'User deleted',
                    title: 'User has been deleted due to inactivity',
                    message: `- User ${user.email} deleted.
                    - last connection: ${user.last_connection}`
                }
                await fetch(`${config.protocol}://${conData.host}/mail/send`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(body)
                }); 
            });
            
            return res.status(200).send({result: 'Users have been deleted'})
        }
        else res.status(404).send({error: response.res});  
    } catch (error) {
        next(error.message);
    }
  
};

export const deleteById = async(req, res, next) => {
    try {
        const {uid} =  req.params;
        if (!uid) return res.status(400).send({error: 'User must be specified'}); 
        const response =  await service.deleteById(uid)
        if (!response.error) return res.status(200).json({result: response.res})
        else res.status(404).send({error: response.res});  
    } catch (error) {
        next(error.message);
    }
};