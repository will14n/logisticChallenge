import { StatusCodes } from "http-status-codes";
import defaultQuerySchema from "../validators/defaultQuerySchema";
import validateQueries from "../helpers/validateQueries";
import { RequestHandler } from "express";

export interface ValidateInterface extends RequestHandler {
}

export const PaginateValidator: ValidateInterface = (request, response, next) => {
    const query = request.query;
    let errors: string[] = [];

    errors = errors.concat(validateQueries(query, defaultQuerySchema));

    if (errors.length > 0) {
        return response.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
    next();
}