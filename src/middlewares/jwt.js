import jwt from 'jsonwebtoken';

export const PRIVATE_KEY = '1234'

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    cart: user.cart
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: '1m',  
  });
  return token;
};