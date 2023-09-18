import { MessageModel } from "./models/message.model.js"

export default class messageDaoMongoDb{
    async getMsgs(){
        try {
            const response = await MessageModel.find({})
            return response
        } catch (error) {
            return error.message; 
        }
    }

    async createMsg(message) {
        try {
            const response = await MessageModel.create(message);
            return response;
        } catch (error) {
            return error.message;  
        }
    }

    async getMsgById(id){
        try {
            const response = await MessageModel.findById(id)
            if (response) {
                return response;
            }else {
                return `Message ${id} not found`;
            }
            
        } catch (error) {
            return error.message; 
        }
    }

    async updateMsg(id, updMessage){
        try {
            const response = await MessageModel.findByIdAndUpdate(id, updMessage,{new: false});
            if (response) {
                return response;
            }else {
                return `Message ${id} not found`;
            }
        } catch (error) {
            return error.message; 
        }
    }

    async deleteMsg(id){
        try {
            const response = await MessageModel.findByIdAndDelete(id)
            if (response) {
                return null;
            }else {
                return `Message ${id} not found`;
            }
        } catch (error) {
            return error.message; 
        }
    }

    async deleteMsgs(){
        try {
            const response = await MessageModel.deleteMany({})
            if (response) {
                return null;
            }
        } catch (error) {
            return error.message; 
        }
    }
}