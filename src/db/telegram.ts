import Prisma from "@prisma/client";

import type { LogUserActionsInDb } from "../types/telegram";

export const telegramDb = new Prisma.PrismaClient();

export async function logUserActionsInDb({
  firstName,
  lastName,
  rsaId,
  userTelegramId,
  userJoinedChannel,
  messageId,
  userCommand,
  botAnswer,
}: LogUserActionsInDb) {
  await telegramDb.telegramUser.upsert({
    where: { userTelegramId },
    create: {
      firstName,
      lastName,
      rsaId,
      userTelegramId,
      telegramMessages: {
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
      userTelegramId,
      userJoinedChannel,
      telegramMessages: {
        create: {
          messageId,
          userCommand,
          botAnswer,
        },
      },
    },
  });
}
