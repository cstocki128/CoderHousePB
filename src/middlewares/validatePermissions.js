import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { PRIVATE_KEY } from './jwt.js';
import userFactory from "../persistence/daos/factory.js"
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 
import errorsDic from '../utils/errors.dictionary.js'
import {logger} from "../utils/logger.js"

export const validatePermissions = async(req,res,next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return httpResponse.Unauthorized(res,errorsDic.NO_LOGIN)
    const token = authHeader.split(" ")[1];
    const decode = verify(token, PRIVATE_KEY);
    const user = await userFactory.userDao.getByid(decode.userId);
    if (!user) {
        logger.error('validate permissions - Unauthorized')
        return httpResponse.Unauthorized(res,errorsDic.NO_LOGIN)
    }
    if(user.role !== 'admin' && user.role !== 'premium') {
        logger.error('validate permissions - Admin or premium required')
        return httpResponse.Forbidden(res,errorsDic.NO_ADMIN)
    }
    next();
}

export const validateAdmin = async(req,res,next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return httpResponse.Unauthorized(res,errorsDic.NO_LOGIN)
    const token = authHeader.split(" ")[1];
    const decode = verify(token, PRIVATE_KEY);
    const user = await userFactory.userDao.getByid(decode.userId);
    if (!user) {
        logger.error('validate permissions - Unauthorized')
        return httpResponse.Unauthorized(res,errorsDic.NO_LOGIN)
    }
    if(user.role !== 'admin') {
        logger.error('validate permissions - Admin required')
        return httpResponse.Forbidden(res,errorsDic.NO_ADMIN)
    }
    next();
}

// export default validatePermissions, validateAdmin;