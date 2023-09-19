import factory from "../../daos/factory.js";
const { productDao } = factory;


export default class ProductRepository {
    constructor(){
        this.dao = productDao;
    }
}