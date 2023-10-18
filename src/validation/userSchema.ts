import { body } from "express-validator";
import { userRepository } from "../repositories";

export const userSchema = [
    body('firstName')
        .isAlpha()
        .withMessage("First Name Must be Alphabets."),

    body('lastName')
        .isAlpha()
        .withMessage("Last Name is Required"),

    body('middleName')
        .not()
        .isEmpty()
        .withMessage("Middle Name is Required"),

    body('age')
        .isInt()
        .withMessage("Age is Must be Number")
        .custom(value=>{
            if(value <18 || value > 58) throw new Error("Age must Be Between 18 and 59")
        return true
        }
        ),

    body('pet')
        .not()
        .isEmpty()
        .withMessage("Pet is Required"),

    body('email')
        .isEmail()
        .withMessage("Email must be Valid")
        .custom(async (value)=>{
            const user = await userRepository.findByEmail(value)
             if(user){
                throw new Error ("Email Taken");
            }

        }),
        
    body('password')
        .isLength({min:6})
        .withMessage("Pasword must longer the 6 digits"),
    
    body('confirmPassword')
     .custom((value,{req})=>{
        if(value!== req.body.password){
            throw new Error("Password Must Match")
        }
        return true;
     })
]
