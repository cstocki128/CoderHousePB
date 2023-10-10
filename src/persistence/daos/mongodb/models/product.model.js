import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    title: {type: String, required: true, index: true},                
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: Array},
    stock: {type: Number, required: true},
    status: {type: Boolean, required: true},
    category: {type: String, required: true, index: true},
    owner: {type: String, required: true, default: 'admin'}
});

productSchema.plugin(mongoosePaginate);
export const ProductModel = mongoose.model('products', productSchema);
