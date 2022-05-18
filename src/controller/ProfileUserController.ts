import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserControler {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new ProfileUserService();
    const result = await service.execute(user_id);

    return response.json(result);
  }
}

export { ProfileUserControler };