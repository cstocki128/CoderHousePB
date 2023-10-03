import {logger} from "../utils/logger.js"

const validateLogin = (req,res,next) => {
    if(req.isAuthenticated()) return next();
    logger.http('ValidateLogin - Logout')
    res.redirect('/login');
}

export default validateLogin;