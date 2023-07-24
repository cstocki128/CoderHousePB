import MessageDaoMongoDb from '../daos/mongodb/message.dao.js';
const msgDao = new MessageDaoMongoDb();

export const getAll = async() => {
    try {
        const response =  await msgDao.getMsgs();
        return {error:false, res:response}
    } catch (err) {
        const error = `message.getAll service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const getById = async(id) => {
    try {
        const response = await msgDao.getMsgById(id)
        if ( typeof response === 'object') {
            return {error:false,res:response}
        }else {
            return {error:true,res:response}
        }
    } catch (err) {
        const error = `message.getById service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const create = async(msg) => {
    try {
        const response = await msgDao.createMsg(msg)
        if (response === null) {
            return {error:false, res:'Message added successfully'}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.create service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const update = async(id,msg) => {
    try {
        const response = await msgDao.updateMsg(id,msg)
        if (response === null) {
            return {error:false, res:`Message ${id} updated successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.update service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const remove = async(id) => {
    try {
        const response = await msgDao.deleteMsg(id)
        if (response === null) {
            return {error:false, res:`Message ${id} removed successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.remove service error: ${err.message}`;
        return {error:true,res:error};
    }
}

export const removeAll = async() => {
    try {
        const response = await msgDao.deleteMsgs()
        if (response === null) {
            return {error:false, res:`Messages removed successfully`}
        }else if(typeof response === 'object'){
            return {error:false, res:response}
        }else{
            return {error:true, res:response}
        }
    } catch (err) {
        const error = `message.removeAll service error: ${err.message}`;
        return {error:true,res:error};
    }
}