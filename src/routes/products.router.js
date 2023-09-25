import {Router} from 'express';
import * as controller from "../controllers/product.controller.js"
import validateAdmin from "../middlewares/validateAdmin.js"
import passport from 'passport'
const productsRouter = Router();

productsRouter.get('/',passport.authenticate('jwt-header',{session:false}), controller.getAll);
productsRouter.get('/:pid',passport.authenticate('jwt-header',{session:false}), controller.getById);
productsRouter.get('/mocks/mockingProducts',passport.authenticate('jwt-header',{session:false}), controller.mockingProducts);
productsRouter.post('/',passport.authenticate('jwt-header',{session:false}),validateAdmin, controller.create); //,
productsRouter.put('/:pid',passport.authenticate('jwt-header',{session:false}),validateAdmin, controller.update);
productsRouter.delete('/:pid',passport.authenticate('jwt-header',{session:false}),validateAdmin, controller.remove);

export default productsRouter;

// productsRouter.get('/', async(req,res) => {
//     try{
//         let limit = parseInt(req.query.limit)
//         let jsonProducts = await productList.getProducts()
//         if( !limit || limit == 0 || !Number.isInteger(limit)) { return res.status(200).json(jsonProducts)}
//         else {
//             let jsonProductsFilter = jsonProducts.filter((product) => {
//                 return jsonProducts.indexOf(product) < limit
//             })
//             res.status(200).json(jsonProductsFilter)
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).send({error: String(err)})
//     }
// }) //http://localhost:8080/products?limit=1

// productsRouter.get('/:pid', async(req,res) => {
//     try{
//         let jsonProducts = await productList.getProductById(parseInt(req.params.pid))
//         if ( typeof jsonProducts === 'object') {
//             res.status(200).json(jsonProducts)
//         }else {
//             res.status(400).send({error:jsonProducts})
//         }
//     }catch(err){
//         console.log(err)
//         res.status(500).send({error: String(err)})
//     }
// }) //http://localhost:8080/products/1

// productsRouter.post('/', async(req,res) => {
//     try{
//         let error = await productList.addProduct(req.body)
//         if (error === null) {
//             res.status(200).json({message: 'Product added successfully'})
//         }else{
//             res.status(400).json({error: String(error)})
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).send({error: String(err)});
//     }
// })

// productsRouter.put('/:pid', async(req,res) => {
//     try{
//         let error = await productList.updateProducts(parseInt(req.params.pid), req.body)
//         if (error === null) {
//             res.status(200).json({message: 'Product updated successfully'})
//         }else{
//             res.status(400).send({error: String(error)})
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).send({error: String(err)});
//     }
// })

// productsRouter.delete('/:pid', async(req,res) => {
//     try{
//         let error = await productList.deleteProduct(parseInt(req.params.pid))
//         if (error === null) {
//             res.status(200).json({message: 'Product removed successfully'})
//         }else{
//             res.status(400).send({error: String(error)})
//         }
//     }catch(err){
//         console.log(err);
//         res.status(500).send({error: String(err)});
//     }
// })

