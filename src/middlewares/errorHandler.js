import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse(); 

export const errorHandler = (error, req, res, next) => {
    if (error.message == 'Unauthorized') return httpResponse.Unauthorized(res, error.message)
    return httpResponse.ServerError(res, error.message ?? 'Internal Server Error')
}