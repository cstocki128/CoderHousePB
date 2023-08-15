import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import * as service from "../services/user.services.js";

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

//Logica
const register = async(req, email, password, done) => {
    try {
        const response = await service.getByEmail(email);
        if (!response.error)return done(response.res, false);  
        else {
            const response = await service.register(req.body)
            if (!response.error) return done(null,response.res)
            else done(response.res, false)
        }
    } catch (error) {
        done(error.message, false)
    }
};

const login = async(req, email, password, done) => {
    try {
        const user = {email, password}
        const response = await service.login(user);
        if (response.error) done(response.res,false); 
        else return done(null,response.res)
    } catch (error) {
        done(error.message, false) 
    }
};

//estrategias
const registerStratregy = new LocalStrategy(strategyOptions, register)
const loginStratregy = new LocalStrategy(strategyOptions, login)

//Inicializacion
passport.use('register', registerStratregy);
passport.use('login', loginStratregy);

//serialize y deserialize
//Guarda el usuario en req.session.passport
passport.serializeUser((user, done) => {
    done(null,user._id);
});
passport.deserializeUser(async(id, done) => {
    const user = await service.getByid(id);
    return done(null,user);
});