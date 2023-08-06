import * as service from "../services/user.services.js";

export const register = async(req, res) => {
    try {
        const user = req.body;
        const newUser = await service.register(user);
        if(!newUser.error) res.redirect('/login');
        else res.redirect('/error-register');
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.login(email, password);
        if(!user.error){
            req.session.email = email;
            req.session.password = password;
            res.redirect('/products');
        }
        else res.redirect('/error-login');
    } catch (error) {
        next(error);
    }
};