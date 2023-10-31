import app from '../../server.js'
import mongoose from 'mongoose';
import request from 'supertest';
import {expect} from 'chai'
import {logger} from "../../utils/logger.js"
import { mockProducts } from '../../utils.js';


describe('Integral Test Products', () => {
    let token;
    beforeAll(async() => {
        try {
            const requestBody = {
                email: 'prueba@gmail.com',
                password: '123456'
            }
            const response = await request(app).post('/api/users/authenticate').send(requestBody);
            token = response.body.token;
            expect(response.statusCode).to.be.equal(200)
            expect(token).to.not.be.null;
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
        await mongoose.connection.collections['products'].drop();
    });

    test('TEST GET /products', async() => {
        try {
            const response = await request(app).get('/api/products').set('Authorization', `bearer ${token}`)
            expect(response.statusCode).to.be.equal(200)
            expect(response.body).to.have.property('payloads')
            expect(response.body.payloads).to.be.a('Array');
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
    });

    let idAux;
    test('TEST POST /products', async() => {
        try {
            const products = await mockProducts(1);
            const response = await request(app)
                .post('/api/products')
                .set('Authorization', `bearer ${token}`)
                .send(products[0])
            expect(response.statusCode).to.be.equal(200)
            expect(response.body.data).to.have.property('_id')
            expect(response.body.data._id).to.not.be.null;
            idAux = response.body.data._id;
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
    });

    test('TEST GET /products/{pid}', async() => {
        try {
            const response = await request(app)
                .get(`/api/products/${idAux}`)
                .set('Authorization', `bearer ${token}`)
                // .query({ pid: idAux })
            expect(response.statusCode).to.be.equal(200)
            expect(response.body.result).to.have.property('_id')
            expect(response.body.result._id).to.be.equal(idAux)
        } catch (error) {
            logger.error(error.message)
            expect(error).to.be.null;
        }
    });

})