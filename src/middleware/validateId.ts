import { NextFunction, Request, Response } from "express"

export function validateId(request: Request, response: Response, next: NextFunction){
    const id=request.params.id

    //Router Level Middleware/Validation
    if(isNaN(id)){
        return response.status(400).send({error:"ID Must be a number"});
    }
    next();
     
}