import {expect} from 'chai';
import mongoose from 'mongoose';
import config from '../../config.js'
import productDao from '../../persistence/daos/factory.js'
import {logger} from "../../utils/logger.js"
import { mockProducts } from '../../utils.js';

describe('Products module unit tests ', () => {
    before(async ()=>{
        try {
            await mongoose.connect(config.mongoUrl);
            await mongoose.connection.collections['products'].drop();
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null; 
        }
    });

    // after(async()=>{
    //     await mongoose.connection.collections['products'].drop();
    // })

    it('Test products.getProducts - Colección vacía',async ()=>{
        try {
            const products = await productDao.productDao.getProducts();
            expect(products.payloads).to.have.length(0); 
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
        
    })

    it('Test products.addProduct', async ()=>{
        try {
            const products = await mockProducts(1);
            const newProduct = await productDao.productDao.addProduct(products[0]);
            expect(newProduct).to.have.property('_id').and.not.null
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        } 
    })

    it('Test products.getProductById', async ()=>{
        try {
            const products = await productDao.productDao.getProducts();
            const product = products.payloads[0]
            const getProduct = await productDao.productDao.getProductById(product._id);
            expect(getProduct).to.have.property('_id').and.not.null;
            expect(getProduct.id).to.equal(product.id);
            expect(getProduct.code).to.equal(product.code);
            const getProductError = await productDao.productDao.getProductById('idFalso');
            expect(getProductError).to.not.be.a('object')
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
    })

    it('Test product.deleteProduct', async ()=>{
        try {
            const products = await productDao.productDao.getProducts();
            const product = products.payloads[0]
            const response = await productDao.productDao.deleteProduct(product._id);
            const productsNull = await productDao.productDao.getProducts();
            expect(productsNull.payloads).to.have.length(0);
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
    })
})