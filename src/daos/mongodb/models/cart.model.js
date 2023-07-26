import mongoose from "mongoose";

const productListSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  products: { type: [productListSchema], default: [] },
});

// productListSchema.pre('find', function(){
//     this.populate('products')
//   })

export const CartModel = mongoose.model('carts', cartSchema);