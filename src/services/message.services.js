import MessageRepository from "../persistence/repository/message/message.repository.js"
import {logger} from "../utils/logger.js"
const messageRepository = new MessageRepository();

export const getAll = async() => {
    try {
        const response =  await messageRepository.dao.getMsgs();
        return {error:false, res:response}
    } catch (err) {
        const error = `message.getAll service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const getById = async(id) => {
    try {
        const response = await messageRepository.dao.getMsgById(id)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            logger.error(`message.getById ${response.res}`)
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `message.getById service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const create = async(msg) => {
    try {
        const response = await messageRepository.dao.createMsg(msg)
        if (response === null) {
            return {error:false, res:'Message added successfully'}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            logger.error(`message.create ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.create service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const update = async(id,msg) => {
    try {
        const response = await messageRepository.dao.updateMsg(id,msg)
        if (response === null) {
            return {error:false, res:`Message ${id} updated successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            logger.error(`message.update ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.update service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const remove = async(id) => {
    try {
        const response = await messageRepository.dao.deleteMsg(id)
        if (response === null) {
            return {error:false, res:`Message ${id} removed successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            logger.error(`message.remove ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.remove service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const removeAll = async() => {
    try {
        const response = await messageRepository.dao.deleteMsgs()
        if (response === null) {
            return {error:false, res:`Messages removed successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            logger.error(`message.removeAll ${response.res}`)
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.removeAll service error: ${err.message}`;
        return {error:true,res:error};
    }
}