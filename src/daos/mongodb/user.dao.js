import config from '../../config.js';
import { UserModel } from "./models/user.model.js";
import {createHash, isValidPassword} from '../../utils.js'
import {CartModel} from "./models/cart.model.js";

export default class UserDaoMongoDb {
    async registerUser(user) {
        try {
            const {email, password} = user;
            const existUser = await this.getByEmail(email)
            user.password = createHash(user.password); //Hasheo
            if (!existUser){
                if (email === config.adminEmail && config.adminPassword ) {
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
            const userExist = await this.getByEmail(email)
            if (userExist) {
                if (isValidPassword(password,userExist)) {
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
            const userExist = await UserModel.findOne({_id}).populate('cart');
            if (userExist) return userExist
            else return false
        }catch(error){
            return error.message;
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({email}).populate('cart');
            if (userExist) return userExist
            else return false
        }catch(error){
            return error.message;
        }
    }

    async addCart(email,cid) {
        try {
            const cartResponse = await CartModel.findById(cid);
            if (cartResponse) {
                const user = await this.getByEmail(email);
                if (user) {
                    user.cart = cartResponse._id;
                    user.save();
                    return user
                }else{
                    return `user ${email} not found`;  
                }
            }else{
                return `Cart ${cid} not found`;
            }
        } catch(error){
            return error.message;
        }
    }
}