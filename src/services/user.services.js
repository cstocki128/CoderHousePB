import {logger} from '../utils/logger.js';
import UserRepository from "../persistence/repository/user/user.repository.js"
const userRepository = new UserRepository();

export const login = async(user) => {
    try {
        const response =  await userRepository.dao.loginUser(user)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            logger.error(`user.login ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.login service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const register = async(user) => {
    try {
        const response =  await userRepository.dao.registerUser(user)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            logger.error(`user.register ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.register service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const getByid = async(id) => {
    try {
        const response =  await userRepository.dao.getByid(id)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            logger.error(`user.getByid ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.getByid service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const getByEmail = async(email) => {
    try {
        const response =  await userRepository.dao.getByEmail(email)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            logger.error(`user.getByEmail ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.getByEmail service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const addCart = async(email,cid) => {
    try {
        const response =  await userRepository.dao.addCart(email,cid)
        if ( typeof response === 'object') {
            return {error:false,res: await userRepository.currentDTO(response)}
        }else {
            logger.error(`user.addCartaddCart ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.addCart service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const current = async (user) => {
    try {
        const userDTO = await userRepository.currentDTO(user)
        return userDTO
    } catch (err) {
        const error = `user.currentDTO service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const loggerTest = async () => {
    try {
        console.log('-----------------------------')
        logger.debug('LOGGER "DEBUG" TEST');
        logger.http('LOGGER "HTTP" TEST');
        logger.info('LOGGER "INFO" TEST');
        logger.warning('LOGGER "WARNING" TEST');
        logger.error('LOGGER "ERROR" TEST');
        logger.fatal('LOGGER "FATAL" TEST');
        return {error:false,res:'Logger Test run successfully'};
    } catch (err) {
        const error = `user.loggerTest service error: ${err.message}`;
        return {error:true,res:error};
    }
}