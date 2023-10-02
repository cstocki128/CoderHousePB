import mongoose from 'mongoose';
import {logger} from '../../../utils/logger.js'
import config from '../../../config.js';
const connectionString = config.mongoUrl

export const initMongoDb = async() => {
    try{
        await mongoose.connect(connectionString);
        logger.info('Conected to MongoDb Database')
    }catch(err){
        logger.fatal(err); 
    }
};