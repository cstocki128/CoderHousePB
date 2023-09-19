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
            console.log(err);
        }  
    }
}