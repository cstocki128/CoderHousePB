import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { PRIVATE_KEY } from '../middlewares/jwt.js';
import userFactory from "../persistence/daos/factory.js"


const validateAdmin = async(req,res,next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized'});
    const token = authHeader.split(" ")[1];
    const decode = verify(token, PRIVATE_KEY);
    const user = await userFactory.userDao.getByid(decode.userId);
    if (!user) return res.status(400).json({ msg: "Unauthorized" });
    if(user.role !== 'admin') return res.status(403).json({ msg: 'Admin privileges required'});
    next();
}

export default validateAdmin;