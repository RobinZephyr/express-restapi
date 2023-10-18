import { NextFunction, Request, Response } from "express"
import { authRepository, userRepository } from "../repositories"

export class AuthController {

    static async create(request:Request, response:Response, next:NextFunction){
        const data = await authRepository.register(request.body);

        if(!data.success){
            return response.status(409).json({error:"Something Went Wrong BAKA!"})
        }
        return response.status(data.statusCode).json({
            accessToken:data.accessToken,
            refreshToken:data.refreshToken
        });
    }


    static async login(request:Request, response:Response, next:NextFunction){
        const data = await authRepository.login(request.body);

        if(!data.success){
            return  response.status(data.statusCode).json({error:data.error})
        }

        response.cookie('jwt', 
        data.refreshToken, {
            httpOnly:true,
            maxAge:24 * 60 * 60 * 1000
        })

        return response.status(data.statusCode).json({
            accessToken:data.accessToken,
            refreshToken:data.refreshToken
        });
    }
}