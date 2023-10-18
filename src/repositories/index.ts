import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { AuthService } from "../service/authService";
import { UserService } from "../service/userService";

export const userRepository = new UserService(
    AppDataSource.getRepository(User)
)


export const authRepository = new AuthService(
    AppDataSource.getRepository(User)
) 