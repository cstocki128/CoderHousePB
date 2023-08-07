import { UserModel } from "./models/user.model.js";

export default class UserDaoMongoDb {
    async registerUser(user) {
        try {
            const {email, password} = user;
            const existUser = await UserModel.findOne({email});
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