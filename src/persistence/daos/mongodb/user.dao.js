import config from '../../../config.js';
import errorsDic from '../../../utils/errors.dictionary.js'
import { UserModel } from "./models/user.model.js";
import {createHash, isValidPassword} from '../../../utils.js'
import {CartModel} from "./models/cart.model.js";
import __dirname from '../../../utils.js';

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
                    userExist.last_connection = Date.now();
                    userExist.save();
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

    async setPermissions(uid) {
        try {
            const user = await this.getByid(uid)
            if (typeof user == 'object')  {
                switch (user.role) {
                    case 'user': {
                        //Se busca en los documentos del usuario para chequear que tenga cargados los 3 tipos de documento.
                        const files = user.documents;
                        let ideOk,cddOk,cdcOk = false;
                        files.forEach(file => {
                            const docInfoArray = file.name.split('-')
                            if(docInfoArray[0] == 'document') {
                                switch (docInfoArray[1]) {
                                    case 'ide':
                                        ideOk = true;
                                        break 
                                    case 'cdd':
                                        cddOk = true;
                                        break
                                    case 'cdc':
                                        cdcOk = true;
                                        break
                                }
                            }
                        })
                        if (ideOk && cddOk && cdcOk) user.role = 'premium';
                        else return 'User must upload ide, cdd and cdc documents to became a premium user' 
                        break;
                    }
                    case 'premium': {
                        user.role = 'user';
                        break; 
                    }
                }
                user.save();
                return;
            }else return errorsDic.NO_USER 
        }catch (error) {
            return error.message;
            } 
    }

    async updatePass(email, newPass){
        try {
            const user = await UserModel.findOne({email})
            if (user){
                if (!isValidPassword(newPass,user)) {
                    user.password = createHash(newPass); //Hasheo
                    user.save();
                    return null;
                }else return 'Password must be diferent from previous password';
            }else return 'User do not exist'
        } catch (error) {
            return error.message; 
        }
    }   

    
    async addDocuments(uid, files){
        try {
            const user = await this.getByid(uid)
            let responseDocs =[]
            const addDocToUser = (user,file) => {
                const newDir = __dirname +"\\public"
                let path = file.path.replace(newDir, "http://localhost:8080")
                path = path.replaceAll("\\",'/');
                const fileObj={name: file.filename , reference:path};
                user.documents.push(fileObj)
                responseDocs.push(fileObj)
            };
            if (typeof user == 'object')  {
                if('product' in files) files.product.forEach(file => {
                    addDocToUser(user,file);
                    
                });
                if('profile' in files) files.profile.forEach(file => {
                    addDocToUser(user,file);
                    
                });
                if('document' in files)  files.document.forEach(file => {
                    addDocToUser(user,file);
                    
                });
                user.save();
                return responseDocs;
            }else return errorsDic.NO_USER 
        } catch (error) {
            return error.message; 
        }
    }

    async getAll() {
        try {
            const response = await UserModel.find({});
            return response
        } catch (error) {
            return error.message;
        }
    }  

    async deleteAllOff() {
        try {
            const twoDays = new Date() 
            twoDays.setDate(twoDays.getDate() - 2);
            const usersDeleted =  await UserModel.find( { $or: [ {"last_connection": { $lt : twoDays }}, {"last_connection": null} ] })
            const result =  await UserModel.deleteMany( { $or: [ {"last_connection": { $lt : twoDays }}, {"last_connection": null} ] });
            if (result.acknowledged) return usersDeleted 
            else return false;
        }catch(error){
            return error.message;
        }
    }
}