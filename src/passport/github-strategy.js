import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import UserDaoMongoDb from '../daos/mongodb/user.dao.js';
const UserDao = new UserDaoMongoDb();

const strategyOptions = {
    clientID: 'Iv1.d6d030eaf23fa1b1',
    clientSecret: 'cfaba61e3fadb619800f2264af0e42584547b36e',
    callbackURL: 'http://localhost:8080/profile-github'
}
  

const registerOrLogin = async(accessToken,refreshToken,profile, done) => {
    try {
        console.log('PROFILE: ',profile);
        const email = profile._json.email ?? profile._json.login;
        const user = await UserDao.loginUser({email, password: ''});
        console.log('user1',user)
        if (typeof user === 'object') return done(null, user);
        const newUser = await UserDao.registerUser({
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
    console.log('serializeUser ',user)
    done(null,user._id);
});
passport.deserializeUser(async(id, done) => {
    const user = await service.getByid(id);
    console.log('deserializeUser ',user)
    return done(null,user);
});