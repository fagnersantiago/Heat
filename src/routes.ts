import { Router } from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateMessageController } from "./controller/CreateMessageController";
import { GetLast3MessageController } from "./controller/GetLast3MessageController";
import { ensureAuthenticate } from "./controller/middleware/ensureAuthenticate";
import { ProfileUserControler } from "./controller/ProfileUserController";

const router = Router();

router.post("/authenticated", new AuthenticateUserController().handle);
router.post(
  "/messages",
  ensureAuthenticate,
  new CreateMessageController().handle
);

router.get("/messages/last3", new GetLast3MessageController().handle);
router.get("/profile", ensureAuthenticate, new ProfileUserControler().handle);

export default router;
