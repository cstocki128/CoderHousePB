import factory from "../../daos/factory.js";
const { userDao } = factory;
import UserResDTO from "../../dtos/user/user.res.dto.js"

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async currentDTO(user){
        try {
            const userDTO = new UserResDTO(user);
            return userDTO
        }catch(err){
            throw new Error(err)
        }  
    }

    async getAllDTO(){
        try {
            let usersDTO;
            const users = await this.dao.getAll();
            console.log(users)
            if (typeof users == 'object'){
                usersDTO = users.map(user => {
                    return new UserResDTO(user);    
                })
            }else throw new Error("getAllDTO Error")
            return usersDTO
        }catch(err){
            throw new Error(err)
        }  
    }
}