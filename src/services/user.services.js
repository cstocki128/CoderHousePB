import {logger} from '../utils/logger.js';
import UserRepository from "../persistence/repository/user/user.repository.js"
import errorsDic from '../utils/errors.dictionary.js'
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
        return {error:true,res:userDTO};
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
        return {error:false,res:'Logger Test run successfull'};
    } catch (err) {
        const error = `user.loggerTest service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const setPermissions =  async (uid) => {
    try {
        const response = await userRepository.dao.setPermissions(uid);
        if (response == null) return {error:false,res:'Set Permissions successfull'}; 
        else {
            logger.error(`user.setPermissions ${response}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.setPermissions service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const updatePass =  async (email, newPass) => {
    try {
        const response = await userRepository.dao.updatePass(email, newPass);
        if (response == null) return {error:false,res:'Password restablished successfull'}; 
        else {
            logger.error(`user.updatePass ${response}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.updatePass service error: ${err.message}`;
        return {error:true,res:error}; 
    }
}

export const addDocuments = async(uid, files, ) => {
    try {
        const resUser =  await getByid(uid);
        if (resUser.error) return resUser
        
        const response = await userRepository.dao.addDocuments(uid, files);
        if (( typeof response === 'object')) {
            return {error:false, res:{description: 'The following files have been added to user', files:response}};
        }else{
            return {error:true, res:response};
            
        }
    } catch (err) {
        throw new Error(`user.addDocuments service error: ${err.message}`);
    }
}

export const getAll = async() => {
    try {
        const response =  await userRepository.getAllDTO()
        if ( typeof response === 'object') {
            return {error:false,res: response}
        }else {
            logger.error(`user.getAll ${response}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.getAll service error: ${err.message}`;
        return {error:true,res:error};
    }
}


export const deleteAllOff = async() => {
    try {
        const response =  await userRepository.dao.deleteAllOff()
        if (response) {
            return {error:false,res: response}
        }else {
            logger.error(`user.deleteAllOff error`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.deleteAllOff service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const deleteById = async(uid) => {
    try {
        const response =  await userRepository.dao.deleteById(uid)
        if (!response) {
            return {error:false,res: 'User has been deleted'}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.deleteById service error: ${err.message}`;
        return {error:true,res:error};
    }
}