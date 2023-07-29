import {CartModel} from './models/cart.model.js';
import {ProductModel} from "./models/product.model.js";

export default class CartDaoMongoDb {
    async getCart(cid) {
        try {
            const response = await CartModel.findById(cid).populate('products._id');
            return response
        } catch (error) {
            return error.message;
        }
    }
    
    async addCart(cart) {
        try {
            const productResponse = await ProductModel.find({});
            const noProd =   cart.products.find((product) => {
                return !(productResponse.find(prod => prod.id === product.id))
            })
            if (!noProd) return await CartModel.create(cart);   
            return `Products in cart not found`;

        } catch (error) {
            return error.message;
        }
    }
    
    async addProductToCart(cid,pid) {
        try {
            const productResponse = await ProductModel.findById(pid);
            if (productResponse) {
                const cartResponse = await CartModel.findById(cid);
                if (cartResponse) {
                    let productMatch;
                    let newProducts = cartResponse.products.map(product => {
                        if(product.id == pid) {
                            productMatch = true;
                            product.quantity +=1;
                        }
                        return product
                    })
                    if (productMatch != true){
                        let newProduct = {
                            id: pid,
                            quantity: 1
                        }
                        newProducts.push(newProduct)
                    }
                    cartResponse.products = newProducts;
                    cartResponse.save();
                    return cartResponse
                }else{
                    return `cart ${cid} not found`;  
                }
            }else{
                return `Product ${pid} not found`;
            }
            
            
        } catch (error) {
            return error.message;
        }
    }
}
