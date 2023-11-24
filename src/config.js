import dotenv from 'dotenv';
let env = process.argv.slice(2).at(0) ?? 'dev';
if (env != 'dev' && env != 'prod') env = 'dev'; //Si viene cualquier otro valor por error, se setea en dev
const environment = env;
const persistence = process.argv.slice(2).at(1) ?? 'MONGO';



dotenv.config({
    path: environment === 'dev' ? './.env.development' : './.env.production',
}); //Carga las variables presentes en el archivo

export default {
    env: environment,
    protocol: process.env.PROTOCOL,
    host: process.env.HOST,
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