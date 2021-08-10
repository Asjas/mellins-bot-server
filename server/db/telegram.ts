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
        botSessionId: true,
        channelSessionId: true,
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
    let botSessionId: string;
    let channelSessionId: string;
    let joinedMellinsChannel: boolean;

    if (["member", "creator", "admin"].includes(ctx.joinedMellinsChannel)) {
      joinedMellinsChannel = true;
    } else {
      joinedMellinsChannel = false;
    }

    if (ctx.botSessionId === "0") {
      botSessionId = hyperInstance();
    } else {
      botSessionId = ctx.botSessionId;
    }

    if (ctx.channelSessionId === "0") {
      channelSessionId = hyperInstance();
    } else {
      channelSessionId = ctx.channelSessionId;
    }

    await telegramDb.telegramUser.upsert({
      where: { telegramId },
      create: {
        firstName,
        lastName,
        username,
        telegramId,
        botSessionId,
        channelSessionId,
        joinedMellinsChannel,
        UserBotTime: {
          create: {
            sessionId: botSessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
        UserChannelTime: {
          create: {
            sessionId: channelSessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
      },
      update: {
        firstName,
        lastName,
        username,
        telegramId,
        joinedMellinsChannel,
        UserBotTime: {
          create: {
            sessionId: botSessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
        UserChannelTime: {
          create: {
            sessionId: channelSessionId,
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
        botSessionId: "0",
        updatedAt: updatedAtDate.toISOString(),
        UserBotTime: {
          update: {
            where: { sessionId: ctx.botSessionId },
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
    let botSessionId: string;

    if (ctx.botSessionId === "0") {
      botSessionId = hyperInstance();
    } else {
      botSessionId = ctx.botSessionId;
    }

    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        kickedBot: false,
        botSessionId,
        updatedAt: updatedAtDate.toISOString(),
        UserBotTime: {
          create: {
            sessionId: botSessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function userLeftChannel(ctx: MyContext) {
  try {
    const { id: telegramId } = ctx.message.from;
    const updatedAtDate = new Date();
    let channelSessionId: string;
    let joinedMellinsChannel: boolean;

    if (["member", "creator", "admin"].includes(ctx.joinedMellinsChannel)) {
      joinedMellinsChannel = true;
    } else {
      joinedMellinsChannel = false;
    }

    if (ctx.channelSessionId === "0") {
      channelSessionId = hyperInstance();
    } else {
      channelSessionId = ctx.channelSessionId;
    }

    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        joinedMellinsChannel,
        channelSessionId: "0",
        updatedAt: updatedAtDate.toISOString(),
        UserChannelTime: {
          update: {
            where: { sessionId: channelSessionId },
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

export async function userJoinedChannel(ctx: MyContext) {
  try {
    const { id: telegramId } = ctx.message.from;
    const updatedAtDate = new Date();
    let channelSessionId: string;
    let joinedMellinsChannel: boolean;

    if (["member", "creator", "admin"].includes(ctx.joinedMellinsChannel)) {
      joinedMellinsChannel = true;
    } else {
      joinedMellinsChannel = false;
    }

    if (ctx.channelSessionId === "0") {
      channelSessionId = hyperInstance();
    } else {
      channelSessionId = ctx.channelSessionId;
    }

    await telegramDb.telegramUser.update({
      where: { telegramId },
      data: {
        joinedMellinsChannel,
        channelSessionId,
        updatedAt: updatedAtDate.toISOString(),
        UserChannelTime: {
          create: {
            sessionId: channelSessionId,
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
    let botSessionId: string;
    let channelSessionId: string;

    if (ctx.botSessionId === "0") {
      botSessionId = hyperInstance();
    } else {
      botSessionId = ctx.botSessionId;
    }

    if (ctx.channelSessionId === "0") {
      channelSessionId = hyperInstance();
    } else {
      channelSessionId = ctx.channelSessionId;
    }

    await telegramDb.telegramUser.upsert({
      where: { telegramId },
      create: {
        firstName,
        lastName,
        rsaId,
        username,
        telegramId,
        botSessionId,
        channelSessionId,
        updatedAt: updatedAtDate.toISOString(),
        UserBotTime: {
          create: {
            sessionId: botSessionId,
            joinedAt: updatedAtDate.toISOString(),
          },
        },
        UserChannelTime: {
          create: {
            sessionId: channelSessionId,
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
