import * as service from "../services/user.services.js";
import { generateToken } from "../middlewares/jwt.js"

// export const register = async(req, res, next) => {
//     try {
//         if(req.session.passport.user) res.redirect('/login');
//         else res.redirect('/error-register');
//     } catch (error) {
//         next(error);
//     }
// };

// export const login = async(req, res, next) => {
//     try {
//         if (req){
//             console.log('passport',req.session.passport.user)
//             const user = await service.getByid(req.session.passport.user);
//             console.log('user',user)
//             if(!user.error){
//                 req.session.first_name = user.res.first_name;
//                 req.session.last_name =  user.res.last_name;
//                 req.session.role = user.res.role;
//                 delete req.session.password;
//                 res.redirect('/products');
//             }
//             else res.redirect('/error-login');
//         }else res.redirect('/error-login');
//     } catch (error) {
//         next(error);
//     }
// };

export const register = async(req, res, next) => {
    const response = await service.register(req.body);
    if (response.error) res.redirect('/error-register')
    else res.redirect('/login')
}

export const login = async(req, res, next) => {
    const response = await service.login(req.body);
    if (response.error) res.redirect('/error-login')
    else{
        const accessToken = generateToken(response.res)
        res
            .cookie('token', accessToken, {httpOnly: true})
            .redirect('/products');
    };

}
 
export const logout = async(req, res) => {
    // req.session.destroy((err) => {
    //     if(!err) res.redirect('/login');
    //     else res.json({ msg: err });
    // })
    res 
        .clearCookie('token')
        .redirect('/login')
};

export const addCart = async(req, res) => {
    const {email, cid} = req.body;
    if (!email || !cid) res.status(400).json('Invalid email or CartId')
    else {
        const response = await service.addCart(email,cid);
        if(response.error) res.status(400).json({error: response.res})
        else res.json({result:response.res})

    };  
};

export const current = async(req, res) => {
    if (req.user) { res.json(await service.current(req.user)) }
    else res.status(404).send({error: 'Not logged in'});  
};

export const authenticate = async(req, res) => {
    const {email, password} = req.body
    if (!email || !password) res.status(400).send({error: 'Invalid email or password'}); 
    const response = await service.login(req.body);
    if (response.error) res.status(404).send({error: response.res});
    const accessToken = generateToken(response.res)
    res.json({token:accessToken});
};