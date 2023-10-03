import fs from 'fs';
import ProductManager from "./product.dao.js";
const productManager = new ProductManager("./src/files/products.json")
const productList = productManager.getProducts()

class CartManager {
    constructor(path) {

        const getCartFile = () => {
            try {
                if (fs.existsSync(path)) {
                    return JSON.parse(fs.readFileSync(path, 'utf8'))
                }else{
                    return []
                }
            }catch(err) {
                return []
            }
        }

        this._path = path;
        this._carts = getCartFile();
    }

    async #_addCartFile(cart) {
        try {
            let cartJson = JSON.stringify(cart);
            await fs.promises.writeFile(this._path, cartJson);
        }catch(err) {
        }
    }

    getCart(cid) {
        const cidNumeric = parseInt(cid)
        const cartFilter =  this._carts.filter((cart) => {
            return cart.id === cidNumeric 
        })

        if (cartFilter.length > 0) {
            return cartFilter[0];
        }else{
            return null
        }
    }

    async addCart(productsList) {
        
        try{
            const products = productsList.products;
            const productsError = () => {
                return  products.some((product) => (product.id == undefined || product.id == 0 || product.quantity == undefined || !productList.some(productL => productL.id == product.id)))
            }

            const getNewId = () => {
                let maxId = 0;
                this._carts.map((cart) => {
                    if (maxId < cart.id) maxId = cart.id;
                })
                return maxId;
            }

            if (products.length > 0 && !productsError()) {
                let carts = this._carts;
                let newCart = {
                    id: getNewId() + 1,
                    products: products
                } 
                carts.push(newCart);
                await this.#_addCartFile(carts);
                return null;
            }else {
                return "Products information is incomplete or incorrect.";
            }

        }catch(err){
            return err;
        }
    }

    async addProductToCart(cid,pid) {
        const cidNumeric = parseInt(cid)
        const pidNumeric = parseInt(pid)
        try {
            if (productList.some(productL => productL.id == pidNumeric)){
                let carts = this._carts;
                let cartMatch;
                let newCarts = carts.map(cart => {
                    if (cart.id == cidNumeric) {
                        cartMatch = true;
                        let productMatch;
                        let newProducts = cart.products.map(product => {
                            if(product.id == pidNumeric) {
                                productMatch = true;
                                product.quantity +=1;
                            }
                            return product
                        })
                        if (productMatch != true){
                            let newProduct = {
                                id: pidNumeric,
                                quantity: 1
                            }
                            newProducts.push(newProduct)
                        }
                        cart.products = newProducts;
                    }
                    return cart
                })
                if (cartMatch) {
                    await this.#_addCartFile(newCarts);
                    return null
                }else {
                    return "Cart ID not found."
                }
            }else{
                return "Product ID not found."
            }
        }catch(err){
            return err; 
        }
    }

}

export default CartManager;