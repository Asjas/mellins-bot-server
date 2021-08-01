import { FastifyInstance } from "fastify";
import Prisma from "@prisma/client";
import fp from "fastify-plugin";

import { prismaDevMiddleware } from "../middleware/prismaMiddleware";

declare module "fastify" {
  interface FastifyInstance {
    db: Prisma.PrismaClient<
      Prisma.Prisma.PrismaClientOptions,
      never,
      Prisma.Prisma.RejectOnNotFound | Prisma.Prisma.RejectPerOperation
    >;
  }
}

async function PrismaClient(fastify: FastifyInstance, opts) {
  const prisma = new Prisma.PrismaClient();

  if (opts.NODE_ENV !== "production") {
    prismaDevMiddleware();
  }

  fastify.decorate("db", prisma);
}

export default fp(PrismaClient);
