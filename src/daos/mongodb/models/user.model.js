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
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        default: null
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
      type: String,
      required: true  
    },
    isGithub: {
        type: Boolean,
        required: true,
        default: false
    }
});

// userSchema.pre('find', function(){ 
//   this.populate('cart');
// });

export const UserModel = mongoose.model('users',userSchema)