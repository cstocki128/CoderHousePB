import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    title: {type: String, required: true},                
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: Array},
    stock: {type: Number, required: true},
    status: {type: Boolean, required: true},
    category: {type: String, required: true}
});

export const ProductModel = mongoose.model('products', productSchema);
