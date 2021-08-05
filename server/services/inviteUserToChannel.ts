// this service is used to invite a user to the private Mellins channel
import dotenv from "dotenv";
import { Api, TelegramClient } from "telegram";
import { Logger } from "telegram/extensions/index.js";
import { StoreSession } from "telegram/sessions/index.js";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH, TELEGRAM_PRIVATE_CHANNEL_ID } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;

async function inviteUserToChannel(telegramId: number) {
  const storeSession = new StoreSession(".telegram_session");

  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  Logger.setLevel("error");

  try {
    await client.connect();

    await client.invoke(
      new Api.channels.InviteToChannel({
        channel: TELEGRAM_PRIVATE_CHANNEL_ID,
        users: [telegramId],
      }),
    );

    await client.disconnect();
  } catch (err) {
    console.error(err);
    await client.disconnect();
  }
}

export default inviteUserToChannel;
