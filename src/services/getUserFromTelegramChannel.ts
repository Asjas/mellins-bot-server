// this service is used to query whether a Telegram user is in the Private Mellins Channel
import dotenv from "dotenv";
import { Api, TelegramClient } from "telegram";
import { Logger } from "telegram/extensions/index.js";
import { StoreSession } from "telegram/sessions/index.js";
import Redis from "ioredis";
import { telegramDb } from "../db/telegram";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH, TELEGRAM_PRIVATE_CHANNEL_ID, REDIS_HOST, REDIS_PORT, REDIS_AUTH } =
  process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;
const THIRTY_MINUTES = 1_800_000; // 30 minutes (in milliseconds)

const redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: REDIS_AUTH,
});

async function getUserFromTelegramChannel(userId: number) {
  // Get user from local cache first
  const user = await redis.get(`telegram:user:${userId}`);

  // If the user is in the cache we return it
  // It will be a boolean string value that we return
  if (user !== null) {
    return Boolean(user);
  }

  // If the user isn't in the cache then we need to query Telegram's API
  const isUserInChannel = await getUserFromChannel(userId);

  // We need to update the local cache
  await redis.setex(`telegram:user:${userId}`, THIRTY_MINUTES, String(isUserInChannel));

  return isUserInChannel;
}

async function getUserFromChannel(userId: number) {
  let isUserInChannel: boolean;
  const storeSession = new StoreSession(".telegram_session");

  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  Logger.setLevel("error");

  try {
    await client.connect();

    const result: any = await client.invoke(
      new Api.channels.GetParticipant({
        channel: Number(TELEGRAM_PRIVATE_CHANNEL_ID),
        participant: new Api.ChannelParticipant({ userId, date: Date.now() }),
      }),
    );

    isUserInChannel = result.participant.userId === userId;

    // We also need to update the database
    await telegramDb.telegramUser.update({
      where: { userTelegramId: userId },
      data: { userJoinedChannel: isUserInChannel },
    });

    await client.disconnect();
  } catch (err) {
    if (err.message === "USER_NOT_PARTICIPANT") {
      isUserInChannel = false;

      // We also need to update the database
      await telegramDb.telegramUser.upsert({
        where: { userTelegramId: userId },
        create: { userJoinedChannel: isUserInChannel, userTelegramId: userId },
        update: { userJoinedChannel: isUserInChannel, userTelegramId: userId },
      });

      await client.disconnect();
    } else {
      await client.disconnect();
    }
  }

  return isUserInChannel;
}

export default getUserFromTelegramChannel;
