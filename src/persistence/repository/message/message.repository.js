import factory from "../../daos/factory.js";
const { messageDao } = factory;

export default class MessageRepository {
    constructor(){
        this.dao = messageDao;
    }
}