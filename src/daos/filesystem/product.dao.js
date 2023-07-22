import fs from 'fs';

class ProductManager {

    constructor(path) {

        const getProductsFile = () => {
            try {
                if (fs.existsSync(path)) {
                    return JSON.parse(fs.readFileSync(path,'utf-8'));
                }else {
                    //console.log(`Could not find the specified path: ${path}`)
                    return []
                }
            }
            catch(err) {
                console.log(`getProductsFile Error: ${err.message}`) 
                return []
            }
        }

        this._products = getProductsFile(path);
        this._path = path
    }

   async #_updProductFile() {
        try {
            let productsJson = JSON.stringify(this._products,'utf-8')
            await fs.promises.writeFile(this._path,productsJson)
        }catch(err) {
            console.log(`updProductFile Error: ${err.message}`)
        }
    }

    async addProduct(product) {
        if (product.code !== null && product.code !== undefined &&
            product.title !== undefined && product.description !== undefined && product.price !== undefined && product.stock !== undefined && product.status !== undefined && product.category !== undefined
            && product.title && product.description && product.price && product.stock && product.status && product.category) {
            
            const getNewId = () => {
                let maxId = 0;
                this._products.map((prod) => {
                    if (maxId < prod.id) maxId = prod.id;
                })
                return maxId;
            }

            const uniqueCode = () => {
                return this._products.some(prod => prod.code === product.code)
            }

            if (!uniqueCode()) {
                const newProduct = {
                    id: getNewId() + 1,
                    code: product.code,
                    title: product.title                ?? "",
                    description: product.description    ?? "",
                    price: product.price                ?? 0,
                    thumbnail: product.thumbnail        ?? [],
                    stock: product.stock                ?? 0,
                    status: product.status              ?? true,
                    category: product.category          ?? ''
                } 
                this._products.push(newProduct);
                await this.#_updProductFile();
                return null; //`Added product: ${product.code}`
            }else{
                return `Product with code ${product.code} already exists.`      
            }
        }else {
            return `All parameters must be provided.`
        }
    }

    getProducts(){
        return this._products;
    }

    getProductById(id){
        const SelectedProd = this._products.filter((prod) => {
                                return prod.id === id
                            })

         return SelectedProd[0] ?? `Product id ${id} not found.`
    }

    async updateProduct(id, updProduct){
        if (updProduct && id){
            let foundId=false
            // console.log(this._products)
            this._products.map((prod) => {
                
                if (prod.id === id) {
                    foundId = true;
                    prod.title          = updProduct.title       ?? prod.title;
                    prod.description    = updProduct.description ?? prod.description;
                    prod.price          = updProduct.price       ?? prod.price;
                    prod.thumbnail      = updProduct.thumbnail   ?? prod.thumbnail;
                    prod.stock          = updProduct.stock       ?? prod.stock;
                    prod.status         = updProduct.status      ?? prod.status;
                    prod.category       = updProduct.category    ?? prod.category;
                }
                
            })
    
            if (foundId) {
                
                await this.#_updProductFile();
                return null; //`Product with id ${id} updated.` 
            }else{

                return `Product with id ${id} not found.`;
            }

        }else{
            return 'all parameters must be provided.';
        }
    }

    async deleteProduct(id){
        if (id){
                const index = this._products.findIndex(prod => prod.id === id);
                if (index!== -1) {
                    this._products.splice(index, 1);
                    await this.#_updProductFile();
                    return null;//`Product with id ${id} deleted.`
                }else{
                    return `Product with id ${id} not found.`;
                }
        } else{
            return 'Id must be provided.';
        }
    }


}


// const pruebaAsync = async() => {
//     try {
//         //Prueba de agregar producto
//         let productPrueba = 
//         {
//             title: 'producto prueba',
//             description: 'Este es un producto prueba',
//             price:200,
//             thumbnail: 'Sin imagen',
//             code: 'abc123',
//             stock:25
//         }
//         console.log(await productList.addProduct(productPrueba))
//         let productPrueba2 = 
//         {
//             title: 'producto prueba 2',
//             description: 'Este es un producto prueba 2',
//             price:200,
//             thumbnail: 'Sin imagen',
//             code: 'abc124'
//         }
//         console.log(await productList.addProduct(productPrueba2))

//         //Prueba de Obtener producto
//         let id = 1
//         console.log('Product1: ',productList.getProductById(id))
//         id = 4
//         console.log('Product4: ',productList.getProductById(id)) //Deberia dar error
//         ///

//         //Prueba de modificacion
//         id = 2
//         let product = {
//             title: "PRUEBA2",
//             thumbnail: "PRUEBA2",
//             stock: 0
//         }
//         console.log(await productList.updateProducts(id,product))
//         console.log(productList.getProducts())
//         ///

//         //Prueba de eliminacion
//         id = 3
//         console.log(await productList.deleteProduct(id))
//         console.log(productList.getProducts())
//         id = 6
//         console.log(await productList.deleteProduct(id)) //Deberia dar error
//         ///

//     } catch(err) {
//         console.log("Prueba Async Error",err)
//     }
// }


// const productList = new ProductManager("./productManager.json")
// console.log(productList.getProducts()) 
// pruebaAsync()

export default ProductManager;