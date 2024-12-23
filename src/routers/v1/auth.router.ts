import { Router } from "express";
import { RegisterController } from "../../controllers/register-controller";
import { LoginController } from "../../controllers/login-controller";
import { container } from "tsyringe";

const authRoute = Router();

const registerController = container.resolve(RegisterController);
const loginController = container.resolve(LoginController);

authRoute.post("/api/v1/auth/register", registerController.exec);
authRoute.post("/api/v1/auth/login", loginController.exec);

export default authRoute;