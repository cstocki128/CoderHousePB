import jwt from 'jsonwebtoken';
import config from '../config.js'

export const PRIVATE_KEY = config.privateKey

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cart: user.cart,
    age: user.age,
    password: user.password,
    isGithub: user.isGithub
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: '15m',  
  });
  return token;
};

export const generateTokenMail = (email) => {
  const payload = {
    email: email
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: '60m',  
  });
  return token;
};