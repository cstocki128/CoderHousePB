const validateLogin = (req,res,next) => {
    console.log('Authorized = ',req.isAuthenticated());
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
}

export default validateLogin;