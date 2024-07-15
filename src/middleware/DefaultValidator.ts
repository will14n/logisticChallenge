import { StatusCodes } from "http-status-codes";
import defaultQuerySchema from "../validators/defaultQuerySchema";
import orderSchema from "../validators/orderSchema";
import defaultParamSchema from "../validators/defaultParamSchema";
import validateParams from "../helpers/validateParams";
import validateQueries from "../helpers/validateQueries";
import validateBody from "../helpers/validateBody";
import { RequestHandler } from "express";

export interface ValidateInterface extends RequestHandler {
}

export const DefaultValidator: ValidateInterface = (request, response, next) => {
    const params = request.params;
    const query = request.query;
    const body = request.body;
    let errors: string[] = [];

    if( request.method === 'POST') {
        errors = errors.concat(validateBody(body, orderSchema));
    }
    else {
        if (request.method === 'PATCH' || request.method === 'PUT') {
            errors = errors.concat(validateBody(body, orderSchema));
        }
        if(request.method === 'GET') {
            errors = errors.concat(validateQueries(query, defaultQuerySchema));
        }
        errors = errors.concat(validateParams(params, defaultParamSchema));
    }

    if (errors.length > 0) {
        return response.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
    next();
}