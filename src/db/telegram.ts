import Prisma from "@prisma/client";

import config from "../config";
import { prismaDevMiddleware } from "../middleware/prismaMiddleware";

import type { LogUserActionsInDb } from "../types/telegram";

export const telegramDb = new Prisma.PrismaClient();

if (config.NODE_ENV !== "production") {
  prismaDevMiddleware();
}

export async function isUserInDb(telegramId: number) {
  return await telegramDb.telegramUser.findUnique({
    where: { telegramId },
    select: {
      firstName: true,
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

export async function logUserActionsInDb({
  firstName,
  lastName,
  rsaId,
  telegramId,
  joinedMellinsChannel,
  messageId,
  userCommand,
  botAnswer,
}: LogUserActionsInDb) {
  const updatedAtDate = new Date();

  await telegramDb.telegramUser.upsert({
    where: { telegramId },
    create: {
      firstName,
      lastName,
      rsaId,
      telegramId,
      TelegramMessages: {
        create: {
          messageId,
          userCommand,
          botAnswer,
        },
      },
      updatedAt: updatedAtDate.toISOString(),
    },
    update: {
      firstName,
      lastName,
      rsaId,
      telegramId,
      joinedMellinsChannel,
      TelegramMessages: {
        create: {
          messageId,
          userCommand,
          botAnswer,
        },
      },
      updatedAt: updatedAtDate.toISOString(),
    },
  });
}
