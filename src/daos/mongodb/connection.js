import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://cstocki128:MatSto128@clustermongo.anw8mjc.mongodb.net/?retryWrites=true&w=majority'

try{
    await mongoose.connect(connectionString);
    console.log('Conected to MongoDb Database')
}catch(err){
    console.log(err);
}