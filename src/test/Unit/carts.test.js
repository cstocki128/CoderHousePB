import {expect} from 'chai';
import mongoose from 'mongoose';
import config from '../../config.js'
import cartDao from '../../persistence/daos/factory.js'
import {logger} from "../../utils/logger.js"
import productDao from '../../persistence/daos/factory.js'
import {mockProducts} from '../../utils.js';

describe('Carts module unit tests ', () => {
    let testProduct;
    before(async ()=>{
        try {
            await mongoose.connect(config.mongoUrl);
            await mongoose.connection.collections['carts'].drop();
            const products = await mockProducts(1);
            testProduct = await productDao.productDao.addProduct(products[0])
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null; 
        }
    });  
    
    after(async()=>{
        await mongoose.connection.collections['carts'].drop();
        await mongoose.connection.collections['products'].drop();
    })

    let idAux;
    it ('Test cart.addCart', async() => {
        try {
            const products = {};
            const cart = await cartDao.cartDao.addCart(products);
            expect(cart).to.have.property('_id');
            idAux = cart.id;
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null; 
        }
    });

    it ('Test cart.getCart', async() => {
        try {
            const cart = await cartDao.cartDao.getCart(idAux);
            expect(cart).to.be.a('object').and.have.property('_id');
            const cartNull = await cartDao.cartDao.getCart('idFalso');
            expect(cartNull).to.not.have.property('_id');    
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null; 
        }
    });

    it('Test cart.addProduct', async() => {
        try {
            const cart = await cartDao.cartDao.addProductToCart(idAux,testProduct.id)
            expect(cart.products).to.be.a('array').and.not.have.length(0);
            expect(cart.id).to.be.equal(idAux)
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;   
        }
    })

    it('Test cart.deleteProducts', async() => {
        try {
            const response = await cartDao.cartDao.deleteProduct(idAux,testProduct.id)
            expect(response).to.be.null;
            // const cart = await cartDao.cartDao.getCart(idAux);
            // expect(cart.products).to.be.a('array').and.have.length(0);
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;   
        }
    })
})