import Prisma from "@prisma/client";
import hyperid from "hyperid";

import config from "../config";
import { prismaDevMiddleware } from "../middleware/prismaMiddleware";

import type MyContext from "../types/telegram";
import type { LogUserActionsInDb } from "../types/telegram";

export const telegramDb = new Prisma.PrismaClient();

if (config.NODE_ENV !== "production") {
  prismaDevMiddleware();
}

const hyperInstance = hyperid();

export async function isUserInDb(telegramId: number) {
  return await telegramDb.telegramUser.findUnique({
    where: { telegramId },
    select: {
      firstName: true,
      rsaId: true,
      TimeOnBot: {
        select: {
          sessionId: true,
        },
      },
    },
  });
}

export async function getUserFromDb(rsaId: string) {
  return await telegramDb.telegramUser.findUnique({
    where: { rsaId },
    select: {
      firstName: true,
      lastName: true,
      rsaId: true,
      telegramId: true,
      joinedMellinsChannel: true,
      kickedBot: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function userStoppedBot(telegramId: number) {
  const updatedAtDate = new Date();

  await telegramDb.telegramUser.update({
    where: { telegramId },
    data: {
      kickedBot: true,
      updatedAt: updatedAtDate.toISOString(),
      // UserStatus: {
      //   update: {
      //     where: { id: }
      //   }
      // }
    },
  });
}

export async function userRestartedBot(telegramId: number) {
  const updatedAtDate = new Date();

  await telegramDb.telegramUser.update({
    where: { telegramId },
    data: {
      kickedBot: false,
      updatedAt: updatedAtDate.toISOString(),
    },
  });
}

export async function customerRSAID(
  ctx: MyContext,
  {
    telegramId,
    firstName,
    lastName,
    rsaId,
  }: {
    telegramId: number;
    firstName: string;
    lastName: string;
    rsaId: string;
  },
) {
  const updatedAtDate = new Date();
  let id: string;

  if (ctx.sessionId === "0") {
    id = hyperInstance();
  } else {
    id = ctx.sessionId;
  }

  console.log({ id });

  await telegramDb.telegramUser.update({
    where: { telegramId },
    data: {
      firstName,
      lastName,
      rsaId,
      telegramId,
      updatedAt: updatedAtDate.toISOString(),
    },
  });
}

export async function logUserActionsInDb(
  ctx: MyContext,
  {
    firstName,
    lastName,
    rsaId,
    telegramId,
    joinedMellinsChannel,
    messageId,
    userCommand,
    botAnswer,
  }: LogUserActionsInDb,
) {
  const updatedAtDate = new Date();
  let id: string;

  if (ctx.sessionId === "0") {
    id = hyperInstance();
  } else {
    id = ctx.sessionId;
  }

  console.log({ id });

  await telegramDb.telegramUser.upsert({
    where: { telegramId },
    create: {
      firstName,
      lastName,
      rsaId,
      telegramId,
      updatedAt: updatedAtDate.toISOString(),
      TelegramMessages: {
        create: {
          messageId,
          userCommand,
          botAnswer,
        },
      },
    },
    update: {
      firstName,
      lastName,
      rsaId,
      telegramId,
      joinedMellinsChannel,
      updatedAt: updatedAtDate.toISOString(),
      TelegramMessages: {
        create: {
          messageId,
          userCommand,
          botAnswer,
        },
      },
    },
  });
}
