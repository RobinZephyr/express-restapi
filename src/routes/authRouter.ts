import {Router} from 'express';
import { AuthController } from '../controller/AuthController';
import { authSchema } from '../validation/authSchema';
import { validateRequest } from '../middleware/validateRequest';

const authRouter = Router();
authRouter.post("/register", authSchema,validateRequest , AuthController.create);

authRouter.post("/login", AuthController.login);

export default authRouter;