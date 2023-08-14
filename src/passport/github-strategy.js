import passport from 'passport';
import * as service from "../services/user.services.js";
import GitHubStrategy from 'passport-github2';

const strategyOptions = {
    clientId: 'Iv1.d6d030eaf23fa1b1',
    clientSecret: 'f7a56b51e9c29c09a099a2dcf7395a4442e4ad53',
    callbackURL: 'http://localhost:8080/users/github'
}
    
//     , async (accessToken, refreshToken, profile, done) => {
//         try {
//             console.log('progile: ', profile);
//             const user = await service.getByEmail(profile._json.email);
//             if (!user){
//                 const newUser = {
//                     first_name: profile._json.first_name,
//                     last_name: '',
//                     age: 18,
//                     email: profile._json.email,
//                     password: ''
//                 }
//                 const result = await userService.create(newUser);
//                 done(null, result);
//             }else done(null,user)
//         } catch (error) {
//             done(error.message, false)  
//         }
//     }))

// }

//serialize y deserialize
passport.serializeUser((user, done) => {
    done(null,user._id);
});
passport.deserializeUser(async(id, done) => {
    const user = await service.getByid(id);
    return done(null,user);
});