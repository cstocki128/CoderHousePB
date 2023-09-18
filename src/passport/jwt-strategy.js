import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt';
import * as service from "../services/user.services.js";
import { PRIVATE_KEY } from '../middlewares/jwt.js';
import UserRepository from '../persistence/repository/user/user.repository.js';
const userRepository = new UserRepository();

const strategyOptionsHeaders = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

const verifyToken = async(jwt_payload, done) => {
    const response = await service.getByid(jwt_payload.userId);
    if (response.error) return done(response.res,false);
    return done(null,response.res);
};


passport.use('jwt-header', new jwtStrategy(strategyOptionsHeaders, verifyToken));
passport.use('jwt-cookie', new jwtStrategy(strategyOptionsCookie, verifyToken));

//serialize y deserialize
//Guarda el usuario en req.session.passport
passport.serializeUser((user, done) => {
    done(null,user.userId);
});
passport.deserializeUser(async(id, done) => {
    const user = await userRepository.getByid(id);
    return done(null,user);
});