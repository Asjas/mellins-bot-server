import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    isUserAllowed: (token: string) => boolean;
    prisma: PrismaClient;
  }

  interface FastifyRequest {
    user: string;
  }
}
