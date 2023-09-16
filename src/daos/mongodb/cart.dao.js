import {CartModel} from './models/cart.model.js';
import {ProductModel} from "./models/product.model.js";
import {TicketModel} from "./models/ticket.model.js";
import crypto from 'crypto';

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
            let noProd;
            if (cart.products != undefined){
                noProd =  cart.products.find((product) => {
                    return !(productResponse.find(prod => prod.id === product.id))
                })
            }else{ 
                cart = {products: []};
                noProd = null;
            }
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

    async updProducts(cid,products) {
        try {
            if (products.payloads) {
                const cart = await CartModel.findById(cid)
                if (cart) {
                    const productsList = products.payloads
                    productsList.forEach((product) => {
                        let ProdFound = false;
                        cart.products.forEach((cartProd) => {
                            if (cartProd._id == product._id) {
                                const prod = ProductModel.findById(product._id);
                                if (prod) {
                                    cartProd.quantity +=1;
                                    ProdFound = true;
                                }else return `product ${pid} does not found`;
                            }
                        })
                        if (ProdFound == false) {
                            const prod = ProductModel.findById(product._id);
                            if (prod) {
                                const newProd = {_id: product._id, quantity:1}
                                cart.products.push(newProd)
                            }else return `product ${pid} does not found`;
                        }
                    })
                    cart.save()
                    return null
                }else return `cart ${cid} not found`;
            }else return 'Must send products to update cart with';
        } catch (error) {
           return error.message; 
        }
    }

    async updProduct(cid,pid,quantity) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const product = await ProductModel.findById(pid);
                if (product) {
                    let prodFound = false;
                    cart.products.forEach(prodCart => {
                        if (prodCart.id == product.id){
                            prodCart.quantity = quantity;
                            prodFound = true;
                        }
                    })
                    if (prodFound){
                        cart.save();
                        return null
                    }else return `product ${pid} does not found in cart ${cid}`;
                }else return `product ${pid} not found`;
            }else return `cart ${cid} not found`;
        } catch (error) {
           return error.message; 
        }
    }

    async deleteProducts(cid) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                if (cart.products.length > 0) {
                    cart.products = [];
                    cart.save();
                    return null
                }else return `cart ${cid} does not have products`;
            }else return `cart ${cid} not found`; 
        } catch (error) {
           return error.message; 
        }
    }

    async deleteProduct(cid,pid) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                if (cart.products.length > 0) {
                    const product = await ProductModel.findById(pid);
                    if (product) {
                        const indexProd = cart.products.findIndex(prod => {
                            return prod.id == product.id
                        })
                        if (indexProd >= 0) {
                            cart.products.splice(indexProd, 1)
                            cart.save();
                            return null
                        }else return `product ${pid} does not found in cart ${cid}`;
                    }else return `product ${pid} does not found`;
                }else return `cart ${cid} does not have products`;
            }else return `cart ${cid} not found`; 
        } catch (error) {
           return error.message; 
        }
    }

    async purchase(cid,email) {
        try {
            const cart = await CartModel.findById(cid)
            if (cart) {
                const noStockProducts = [];
                let amount=0;
                for (const prod of cart.products) {
                    const product = await ProductModel.findById(prod.id); 
                    if (product.stock < prod.quantity) {
                        noStockProducts.push(prod);
                    }else {
                        amount += (product.price * prod.quantity);
                        product.stock -= prod.quantity;
                        product.save();
                    }
                }
                if (amount>0){
                    cart.products = noStockProducts;
                    cart.save();
                    const newTicket = {amount: amount, purchaser:email};
                    return await TicketModel.create({...newTicket, code:`TICK${crypto.randomBytes(8).toString('hex')}`});
                }else return {description:`cart ${cid} does not have products in stock for the ordered quantity `, products: noStockProducts};
            }else return `cart ${cid} not found`; 
        } catch (error) {
            return error.message;
        };
    };
};
