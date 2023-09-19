import mongoose from 'mongoose';
import config from '../../../config.js';
const connectionString = config.mongoUrl

export const initMongoDb = async() => {
    try{
        await mongoose.connect(connectionString);
        console.log('Conected to MongoDb Database')
    }catch(err){
        console.log(err); 
    }
};