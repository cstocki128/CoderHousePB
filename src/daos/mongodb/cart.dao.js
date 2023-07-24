import {CartModel} from './models/cart.model.js';
import {ProductModel} from "./models/product.model.js";

export default class CartDaoMongoDb {
    async getCart(cid) {
        try {
            const response = await CartModel.findById(cid);
            return response
        } catch (error) {
            return error.message;
        }
    }

    async addCart(products) {
        try {
                const cart = await CartModel.create(products);
                // products.products.forEach(element => {
                //     cart.products.push(element.id);
                // });
                // cart.save();
                // const productsJson = `{products:${products}}`
                return cart
   
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
