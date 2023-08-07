import UserDaoMongoDb from '../daos/mongodb/user.dao.js';
const UserDao = new UserDaoMongoDb();

export const login = async(email, password) => {
    try {
        const response =  await UserDao.loginUser(email, password)
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