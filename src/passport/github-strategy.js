import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import config from '../config.js';
import UserRepository from '../persistence/repository/user/user.repository.js';
const userRepository = new UserRepository();

const strategyOptions = {
    clientID: config.clientId_Github,
    clientSecret: config.clientSecret_Github,
    callbackURL: config.callbackUrl_Github
}
  

const registerOrLogin = async(accessToken,refreshToken,profile, done) => {
    try {
        const email = profile._json.email ?? profile._json.login;
        const user = await userRepository.dao.loginUser({email, password: ''});
        if (typeof user === 'object') return done(null, user);
        const newUser = await userRepository.dao.registerUser({
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] ?? profile._json.name.split(' ')[2],
            email,
            password: '',
            isGithub: true
        })
        return done(null,newUser);
    } catch (error) {
        return done(error,false)
    }
    
};

passport.use('github', new GitHubStrategy(strategyOptions, registerOrLogin))

//serialize y deserialize
//Guarda el usuario en req.session.passport
passport.serializeUser((user, done) => {
    done(null,user._id);
});
passport.deserializeUser(async(id, done) => {
    const user = await userRepository.dao.getByid(id);
    return done(null,user);
});