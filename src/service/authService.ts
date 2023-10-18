import { Repository } from "typeorm"
import { User } from "../entity/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";


export class AuthService{
    constructor (private readonly userRepository:Repository<User>){};

    async register(newuser:User){
        const hashPassword =await bcrypt.hash(newuser.password,10);
        
        const user=this.userRepository.create(newuser)
       user.password=hashPassword;

        await this.userRepository.save(user);
        delete user.password;


        const accessToken = jwt.sign({
            id:user.id, 
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'15m'
        });
    
        const refreshToken = jwt.sign({
            id:user.id, 
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:24 * 60 * 60 * 1000 //24 hours
        });

        
        return{
            accessToken,
            refreshToken,
            statusCode:201,
            success:true
        }
    }

    async findByEmail(email:string){
        const users = await this.userRepository.findOne({where:{email}})

        return users;
    }



    //Login
                           
    async login(credentials: Partial<User>){
        const {email,password}= credentials;
        //const user is search for matching emails in the Database
        const user = await this.userRepository.findOne({where:{email}});

        //if user has no matching email in Database. Error
        if(!user){
            return {
                error:"No Record Found",
                statusCode:404,
                success:false
            }
        }
        //isValid is comparing bycrpt. password is the one entered by the user and user.password is retrieved from the findOne
        const isValid = await bcrypt.compare(password,user.password);

        //if isValid is false or password doesent match. Error
        if(!isValid){
            return {
                error:"Invalid Credentials",
                statusCode:400,
                success:false
            } 
        }
        
        //Generate JWT Token
        const accessToken = jwt.sign({
            id:user.id, 
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'15m'
        });
    
        const refreshToken = jwt.sign({
            id:user.id, 
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:24 * 60 * 60 * 1000 //24 hours
        });

        return{
            accessToken,
            refreshToken,
            statusCode:200,
            success:true
        }
    
    }
}