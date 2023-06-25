import fs from 'fs';

class Cart {
    constructor(path) {

        const getCartFile = () => {
            try {
                if (fs.existsSync(path)) {
                    return JSON.parse(fs.readFileSync(path, 'utf8'))
                }else{
                    console.log(`Could not find the specified path: ${path}`)
                    return []
                }
            }catch(err) {
                console.log("getCartFile Error: ",err)
            }
        }

        this._path = path;
        this._cart = getCartFile();
    }

    getCart(cid) {
        const cartFilter =  this._cart.filter((cart) => {
            return cart.id === cid 
        })

        if (cartFilter.length > 0) {
            return cartFilter[0];
        }else{
            return null
        }
    }
}

export default Cart;