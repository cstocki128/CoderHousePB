import {ProductModel} from "./models/product.model.js";

export default class ProductDaoMongoDb {
    async getProducts(limit, page, sort, categoryF, statusF){
        console.log(limit, page, sort, categoryF, statusF)
        try {

            const myCustomLabels = {
                totalDocs: false,
                docs: 'payloads',
                pagingCounter: false,
                limit: false,
            };
              
            //query params filter paginate
            if (isNaN(page)) page = 1;
            if (isNaN(limit)) limit = 10;
            
            let options = {
            page: page,
            limit: limit,
            customLabels: myCustomLabels,
            sort: {price: sort}
            };
            let query = {category: categoryF,
            status: statusF
            }

            if (!sort)  delete options['sort'];
            if (!categoryF)  delete query['category'];
            if (statusF != true && statusF != false)  delete query['status'];          
            //

            const response = await ProductModel.paginate(query, options);
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