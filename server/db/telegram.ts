import Prisma from "@prisma/client";
import hyperid from "hyperid";

import config from "../config";
import { prismaDevMiddleware } from "../middleware/prismaMiddleware";

import type MyContext from "../types/telegram";

export const telegramDb = new Prisma.PrismaClient();

if (config.NODE_ENV !== "production") {
  prismaDevMiddleware();
}

const hyperInstance = hyperid();

export async function isUserInDb(telegramId: number) {
  try {
    return await telegramDb.telegramUser.findUnique({
      where: { telegramId },
      select: {
        firstName: true,
        rsaId: true,
        sessionId: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getUserFromDb(rsaId: string) {
  try {
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
  } catch (err) {
    console.error(err);
  }
}

export async function getUsers() {
  try {
    return await telegramDb.telegramUser.findMany();
  } catch (err) {
    console.error(err);
  }
}

export async function createUser(ctx: MyContext) {
  try {
    const updatedAtDate = new Date();
    const { first_name: firstName = "", last_name: lastName = "", id: telegramId, username } = ctx.message.from;
    let sessionId: string;

    if (ctx.sessionId === "0") {
      sessionId = hyperInstance();
    } else {
      sessionId = ctx.sessionId;
    }

    await telegramDb.telegramUser.upsert({
      where: { telegramId },
      create: {
        firstName,
        lastName,
        username,
        telegramId,
        sessionId,
        UserBotTime: {
          create: {
            sessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
      },
      update: {
        firstName,
        lastName,
        username,
        telegramId,
        UserBotTime: {
          create: {
            sessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function userStoppedBot(ctx) {
  try {
    const { id: telegramId } = ctx.update.my_chat_member.from;
    const updatedAtDate = new Date();

    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        kickedBot: true,
        sessionId: "0",
        updatedAt: updatedAtDate.toISOString(),
        UserBotTime: {
          update: {
            where: { sessionId: ctx.sessionId },
            data: {
              leftAt: updatedAtDate.toISOString(),
            },
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function userRestartedBot(ctx) {
  try {
    const { id: telegramId } = ctx.update.my_chat_member.from;
    const updatedAtDate = new Date();
    let sessionId: string;

    if (ctx.sessionId === "0") {
      sessionId = hyperInstance();
    } else {
      sessionId = ctx.sessionId;
    }

    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        kickedBot: false,
        sessionId,
        updatedAt: updatedAtDate.toISOString(),
        UserBotTime: {
          create: {
            sessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function customerRSAID(ctx: MyContext, rsaId: string) {
  try {
    const { first_name: firstName = "", last_name: lastName = "", id: telegramId, username } = ctx.message.from;
    const updatedAtDate = new Date();
    let sessionId: string;

    if (ctx.sessionId === "0") {
      sessionId = hyperInstance();
    } else {
      sessionId = ctx.sessionId;
    }

    await telegramDb.telegramUser.upsert({
      where: { telegramId },
      create: {
        firstName,
        lastName,
        rsaId,
        username,
        telegramId,
        sessionId,
        updatedAt: updatedAtDate.toISOString(),
        UserBotTime: {
          create: {
            sessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
      },
      update: {
        firstName,
        lastName,
        rsaId,
        telegramId,
        updatedAt: updatedAtDate.toISOString(),
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function userJoinedChannel(telegramId: number) {
  try {
    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        joinedMellinsChannel: true,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function userLeftChannel(telegramId: number) {
  try {
    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        joinedMellinsChannel: false,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
