import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { PRIVATE_KEY } from '../middlewares/jwt.js';
import userFactory from "../persistence/daos/factory.js"
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 
import errorsDic from '../utils/errors.dictionary.js'

const validateAdmin = async(req,res,next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return httpResponse.Unauthorized(res,errorsDic.NO_LOGIN)
    const token = authHeader.split(" ")[1];
    const decode = verify(token, PRIVATE_KEY);
    const user = await userFactory.userDao.getByid(decode.userId);
    if (!user) return httpResponse.Unauthorized(res,errorsDic.NO_LOGIN)
    if(user.role !== 'admin') return httpResponse.Forbidden(res,errorsDic.NO_ADMIN)
    next();
}

export default validateAdmin;