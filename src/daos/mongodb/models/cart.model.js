import mongoose from "mongoose";

const productListSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  products: { type: [productListSchema], default: [] },
});

// cartSchema.pre('find', function(){ //NO FUNCIONA
//   this.populate('products._id');
// });

export const CartModel = mongoose.model("carts", cartSchema);
