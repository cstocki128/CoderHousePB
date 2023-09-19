import dotenv from 'dotenv';
const environment = process.argv.slice(2).at(0);
environment === 'dev' ? console.log('Using .env.development') : console.log('Using .env.production');
const persistence = process.argv.slice(2).at(1) ?? 'MONGO';

dotenv.config({
    path: environment === 'dev' ? './.env.development' : './.env.production',
}); //Carga las variables presentes en el archivo

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: persistence,
    privateKey: process.env.PRIVATE_KEY,
    clientId_Github: process.env.CLIENT_ID_GITHUB,
    clientSecret_Github: process.env.CLIENT_SECRET_GITHUB,
    callbackUrl_Github: process.env.CALLBACK_URL_GITHUB,
    pass_Google: process.env.APP_PASS_GOOGLE,
    user_Google: process.env.APP_USER_GOOGLE
};