import {ProductModel} from "./models/product.model.js";

export default class ProductDaoMongoDb {
    async getProducts(){
        try {
            const response = await ProductModel.find({});
            return response;
        } catch (error) {
            return error.message;
        }
    }

    async addProduct(product) {
        try {
            const response = await ProductModel.create(product);
            return response;
        } catch (error) {
            return error.message;  
        }
    }

    async getProductById(id){
        try {
            const response = await ProductModel.findById(id)
            if (response) {
                return response;
            }else {
                return `Product ${id} not found`;
            }
            
        } catch (error) {
            return error.message; 
        }
    }

    async updateProduct(id, updProduct){
        try {
            const response = await ProductModel.findByIdAndUpdate(id, updProduct,{new: true});
            if (response) {
                return response;
            }else {
                return `Product ${id} not found`;
            }
        } catch (error) {
            return error.message; 
        }
    }

    async deleteProduct(id){
        try {
            const response = await ProductModel.findByIdAndDelete(id)
            if (response) {
                return null;
            }else {
                return `Product ${id} not found`;
            }
        } catch (error) {
            return error.message; 
        }
    }
}