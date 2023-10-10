import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import * as service from "../services/user.services.js";
import { PRIVATE_KEY } from '../middlewares/jwt.js';
import UserRepository from '../persistence/repository/user/user.repository.js';
const userRepository = new UserRepository();
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 

const strategyOptionsHeaders = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken({failmessage: 'missing token'}),
    secretOrKey: PRIVATE_KEY
};

const cookieExtractor = (req) => {
    const token = req.cookies.token;
    return token;
}

const strategyOptionsCookie = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PRIVATE_KEY
};


const cookieExtractorMail = (req) => {
    const token = req.cookies.passtoken;
    return token;
}

const strategyOptionsCookieMail = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractorMail]),
    secretOrKey: PRIVATE_KEY
};

const verifyToken = async(jwt_payload, done) => {
    const response = await service.getByid(jwt_payload.userId);
    if (response.error) return done(response.res,false);
    return done(null,response.res);
};

const verifyTokenMail = async(jwt_payload, done) => {
    const response = await service.getByEmail(jwt_payload.email);
    if (response.error) return done(response.res,false);
    return done(null,response.res);
};


passport.use('jwt-header', new jwtStrategy(strategyOptionsHeaders, verifyToken));
passport.use('jwt-cookie', new jwtStrategy(strategyOptionsCookie, verifyToken));
passport.use('jwt-cookie-mail', new jwtStrategy(strategyOptionsCookieMail, verifyTokenMail));

//serialize y deserialize
//Guarda el usuario en req.session.passport
passport.serializeUser((user, done) => {
    done(null,user.userId);
});
passport.deserializeUser(async(id, done) => {
    const user = await userRepository.dao.getByid(id);
    return done(null,user);
});