import { Router } from "express";
import { ProfileController } from "../../controllers/profile-controller";
import { container } from "tsyringe";

const profileRouter = Router();

const profileController = container.resolve(ProfileController);

profileRouter.get("/api/v1/profile", profileController.exec);

export default profileRouter;