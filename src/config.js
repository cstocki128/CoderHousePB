import dotenv from 'dotenv';

dotenv.config(); //Carga las variables presentes en el archivo

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD
};