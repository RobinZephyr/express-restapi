import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator";

export function validateRequest(request: Request, response: Response, next: NextFunction){
    const id=request.params.id

    //Router Level Middleware/Validation
    const errors=validationResult(request);
    if(!errors.isEmpty()){
        return response.status(201).json({errors:errors.array()});
    }
    next();
     
}