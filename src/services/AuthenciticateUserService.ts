import axios from "axios";
import prismaClient from "../controller/prisma";
import { sign } from "jsonwebtoken";

interface IAccessToken {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}
class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const { data: access_tokenResponse } = await axios.post<IAccessToken>(
      url,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const response = await axios.get<IUserResponse>(
      "http://api.github.com/user",
      {
        headers: {
          authorization: `Bearer ${access_tokenResponse.access_token}`,
        },
      }
    );

    const { login, id, avatar_url, name } = response.data;

    let user = await prismaClient.uSER.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.uSER.create({
        data: {
          github_id: id,
          name,
          login,
          avatar_url,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.github_id,
        },
      },

      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return { token, user };
  }
}

export { AuthenticateUserService };
