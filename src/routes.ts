import { Router } from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";

const router = Router();

router.post("/authenticated", new AuthenticateUserController().handle);

export default router;
