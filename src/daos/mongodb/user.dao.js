import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDb {
    async registerUser(user) {
        try {
            const {email} = user;
            const existUser = await UserModel.findOne({email});
            console.log('ExistUser:', existUser)
            if (!existUser){
                const newUser = await UserModel.create(user); 
                return newUser;
            }else return 'User already exists';
        }catch(error){
            return error.message;
        }
    }

    async loginUser(email, password) {
        try {
            const userExist = await UserModel.findOne({email, password});
            if (userExist) return userExist
            else return 'User does not exist'; 
        }catch(error){
            return error.message;
        }
    }

}