import prismaClient from "../controller/prisma";

class ProfileUserService {
  async execute(user_id: string) {
    const user = await prismaClient.uSER.findFirst({
      where: {
        id: user_id,
      },
    });

    return user;
  }
}

export { ProfileUserService };
