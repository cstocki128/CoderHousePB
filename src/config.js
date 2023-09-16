import dotenv from 'dotenv';
const environment = process.argv.slice(2).at(0)
environment === 'd' ? console.log('Using .env.development') : console.log('Using .env.production');

dotenv.config({
    path: environment === 'd' ? './.env.development' : './.env.production'
}); //Carga las variables presentes en el archivo

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
};