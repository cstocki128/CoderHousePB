import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    role:{
        type: String,
        required: true,
        default: 'user'
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
      type: String,
      required: true  
    }
});

export const UserModel = mongoose.model('users',userSchema)