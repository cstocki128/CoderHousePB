import { UserModel } from "./models/user.model.js";
import {createHash, isValidPassword} from '../../utils.js'

export default class UserDaoMongoDb {
    async registerUser(user) {
        try {
            const {email, password} = user;
            const existUser = await this.getByEmail(email)
            user.password = createHash(user.password); //Hasheo
            if (!existUser){
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123' ) {
                    const newUser = await UserModel.create({...user,role: 'admin'})
                    return newUser
                }
                else {
                    const newUser = await UserModel.create(user);
                    return newUser
                }
            }else return 'User already exists';
        }catch(error){
            return error.message;
        }
    }

    async loginUser(user) {
        try {
            const {email, password} = user;
            console.log('USER',user)
            const userExist = await this.getByEmail(email)
            console.log('userExist',userExist)
            if (userExist) {
                if (isValidPassword(password,userExist)) {
                    console.log('isValidPassword')
                    return userExist
                }else return 'Incorrect Password'; 
            }
            else return 'User does not exist'; 
        }catch(error){
            return error.message;
        }
    }


    async getByid(_id) {
        try {
            const userExist = await UserModel.findOne({_id});
            if (userExist) return userExist
            else return false
        }catch(error){
            return error.message;
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({email});
            if (userExist) return userExist
            else return false
        }catch(error){
            return error.message;
        }
    }
}