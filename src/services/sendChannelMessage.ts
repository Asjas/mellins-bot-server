// this service is used to query whether a Telegram user is in the Private Mellins Channel
import dotenv from "dotenv";
import { Api, TelegramClient } from "telegram";
import { Logger } from "telegram/extensions/index.js";
import { StoreSession } from "telegram/sessions/index.js";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH, TELEGRAM_PRIVATE_CHANNEL_ID } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;

async function sendChannelMessage({ message }: { message: string }) {
  const storeSession = new StoreSession(".bot_telegram_session");

  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  Logger.setLevel("error");

  try {
    await client.connect();

    await client.invoke(
      new Api.messages.SendMessage({
        peer: new Api.PeerChannel({ channelId: Number(TELEGRAM_PRIVATE_CHANNEL_ID) }),
        message,
        silent: false,
      }),
    );

    await client.disconnect();
  } catch (err) {
    console.error(err);
    await client.disconnect();
  }
}

export default sendChannelMessage;
