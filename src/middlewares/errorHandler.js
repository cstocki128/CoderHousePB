import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 
import {logger} from "../utils/logger.js"

export const errorHandler = (error, req, res, next) => {
    logger.error(`ErrorHandler - ${error.message}`)
    if (error.message == 'Unauthorized') return httpResponse.Unauthorized(res, error.message)
    return httpResponse.ServerError(res, error.message ?? 'Internal Server Error')
}