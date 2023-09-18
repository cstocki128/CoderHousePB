import factory from "../../daos/factory.js";
const { cartDao } = factory;

export default class CartRepository {
    constructor(){
        this.dao = cartDao;
    }
}