import {Router} from 'express';
import { UserController } from '../controller/UserController';
import { validateId } from '../middleware/validateId';
import { userSchema } from '../validation/userSchema';
import { validateRequest } from '../middleware/validateRequest';

const userRouter = Router();

userRouter.get("/users", UserController.all);

userRouter.get("/users/:id", validateId, UserController.findOne);

userRouter.post("/users", userSchema, validateRequest, UserController.create);

userRouter.put("/users/:id", UserController.update);

userRouter.delete("/users/:id", UserController.delete);



export default userRouter;