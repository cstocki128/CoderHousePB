import fs from 'fs';

class ProductManager {

    constructor(path) {

        const getProductsFile = () => {
            try {
                if (fs.existsSync(path)) {
                    return JSON.parse(fs.readFileSync(path,'utf-8'));
                }else {
                    return []
                }
            }
            catch(err) { 
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

    getProducts(limit, page, sort, categoryF, statusF){
        return this._products;
    }

    getProductById(id){
        const idNumeric = parseInt(id)
        const SelectedProd = this._products.filter((prod) => {
                                return prod.id === idNumeric
                            })

         return SelectedProd[0] ?? `Product id ${id} not found.`
    }

    async updateProduct(id, updProduct){
        const idNumeric = parseInt(id)
        if (updProduct && idNumeric){
            let foundId=false
            this._products.map((prod) => {
                
                if (prod.id === idNumeric) {
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
        const idNumeric = parseInt(id)
        if (idNumeric){
                const index = this._products.findIndex(prod => prod.id === idNumeric);
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

export default ProductManager;