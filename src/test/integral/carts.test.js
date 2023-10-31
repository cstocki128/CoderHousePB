import app from '../../server.js'
import mongoose from 'mongoose';
import request from 'supertest';
import {expect} from 'chai'
import {logger} from "../../utils/logger.js"
import {mockProducts} from '../../utils.js';
import productDao from '../../persistence/daos/factory.js';
import userDao from '../../persistence/daos/factory.js';

describe('Integral Test Carts', () => {
    let token;
    let testProduct;
    let requestBody = {};
    beforeAll(async() => {
        try {
            requestBody = {
                email: 'prueba@gmail.com',
                password: '123456'
            }
            const response = await request(app).post('/api/users/authenticate').send(requestBody);
            token = response.body.token;
            expect(response.statusCode).to.be.equal(200)
            expect(token).to.not.be.null;
            const products = await mockProducts(1);
            testProduct = await productDao.productDao.addProduct(products[0])
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
        await mongoose.connection.collections['carts'].drop();
    });

    afterAll(async() => {
        // await mongoose.connection.collections['products'].drop();
        await mongoose.connection.collections['users'].findOneAndUpdate({email:requestBody.email},{$set: {cart: null}})
    })
    let idAux;
    test('TEST GET /carts', async() => {
        
        try {
            const requestBody = {};
            const response = await request(app)
                .post('/api/carts')
                .set('Authorization', `bearer ${token}`)
                .send(requestBody)
            expect(response.statusCode).to.be.equal(200)
            expect(response.body.result).to.have.property('_id');
            idAux = response.body.result._id;
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
    });   
    
    test('TEST GET /carts/{cid}', async() => {
        const response = await request(app)
            .get(`/api/carts/${idAux}`)
            .set('Authorization', `bearer ${token}`)
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.result).to.have.property('_id');
        expect(response.body.result._id).to.be.equal(idAux);
    })

    test('TEST POST /carts/{cid}/products/{pid}', async() => {
        const user = await userDao.userDao.addCart(requestBody.email,idAux)
        expect(user).to.not.be.null;
        const response = await request(app)
            .post(`/api/carts/${idAux}/products/${testProduct._id}`)
            .set('Authorization', `bearer ${token}`)
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.result).to.have.property('_id');
        expect(response.body.result._id).to.be.equal(idAux);
        expect(response.body.result).to.have.property('products')
        expect(response.body.result.products).to.be.a('array').and.have.length(1);
    })
})