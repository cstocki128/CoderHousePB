
import ProductManager from './ProductManager.js';
import express, { query } from 'express';
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true})); 
app.listen(8080, () => {console.log('Servidor arriba en el puerto 8080')})


const productList = new ProductManager("./src/productManager.json")

app.get('/products/', async(req,res) => {
    try{
        let limit = parseInt(req.query.limit)
        let jsonProducts = await productList.getProducts()
        if( !limit || limit == 0 || !Number.isInteger(limit)) { return res.json(jsonProducts)}
        else {
            let jsonProductsFilter = jsonProducts.filter((product) => {
                return jsonProducts.indexOf(product) < limit
            })
            res.json(jsonProductsFilter)
        }
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
    }
}) //http://localhost:8080/products?limit=1

app.get('/products/:id', async(req,res) => {
    try{
        let jsonProducts = await productList.getProductById(parseInt(req.params.id))
        if ( typeof jsonProducts === 'object') {
            res.json(jsonProducts)
        }else {
            res.status(400).send({error:jsonProducts})
        }
    }catch(err){
        console.log(err)
        res.status(500).send({error:err})
    }
}) //http://localhost:8080/products/1


