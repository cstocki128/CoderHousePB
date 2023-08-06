import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://cstocki128:MatSto128@clustermongo.anw8mjc.mongodb.net/ecommerce?retryWrites=true&w=majority'
export default connectionString;

try{
    await mongoose.connect(connectionString);
    console.log('Conected to MongoDb Database')
}catch(err){
    console.log(err);
}