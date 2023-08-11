import * as service from "../services/user.services.js";

export const register = async(req, res, next) => {
    try {
        if(req.session.passport.user) res.redirect('/login');
        else res.redirect('/error-register');
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        console.log('passport',req.session.passport.user)
        const user = await service.getByid(req.session.passport.user);
        console.log('user',user)
        if(!user.error){
            req.session.first_name = user.res.first_name;
            req.session.last_name =  user.res.last_name;
            req.session.role = user.res.role;
            delete req.session.password;
            res.redirect('/products');
        }
        else res.redirect('/error-login');
    } catch (error) {
        next(error);
    }
};
 
export const logout = async(req, res) => {
    req.session.destroy((err) => {
        if(!err) res.redirect('/login');
        else res.json({ msg: err });
    })
};