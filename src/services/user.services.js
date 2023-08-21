import UserDaoMongoDb from '../daos/mongodb/user.dao.js';
const UserDao = new UserDaoMongoDb();

export const login = async(user) => {
    try {
        const response =  await UserDao.loginUser(user)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.login service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const register = async(user) => {
    try {
        const response =  await UserDao.registerUser(user)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.register service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const getByid = async(id) => {
    try {
        const response =  await UserDao.getByid(id)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.getByid service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const getByEmail = async(email) => {
    try {
        const response =  await UserDao.getByEmail(email)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.getByEmail service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const addCart = async(email,cid) => {
    try {
        const response =  await UserDao.addCart(email,cid)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `user.addCart service error: ${err.message}`;
        return {error:true,res:error};
    }
}