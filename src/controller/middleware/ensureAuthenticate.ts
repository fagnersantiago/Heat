import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authTokent = request.headers.authorization;

  if (!authTokent) {
    return response.status(401).json({
      errorCode: "Token invalid",
    });
  }

  const [, token] = authTokent.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ errorCode: error });
  }
}
