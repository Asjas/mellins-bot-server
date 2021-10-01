import dotenv from "dotenv";
import { TelegramClient } from "telegram";
import { Logger } from "telegram/extensions/index.js";
import { StoreSession } from "telegram/sessions/index.js";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH, TELEGRAM_PRIVATE_CHANNEL_ID } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;

async function sendChannelMessage({ message, attachment }: { message: string; attachment: any }) {
  const storeSession = new StoreSession(".bot_telegram_session");

  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  Logger.setLevel("error");

  try {
    await client.connect();

    if (attachment) {
      await client.sendMessage(Number(TELEGRAM_PRIVATE_CHANNEL_ID), {
        message: `${message}\n\nMellins i-Style Head Office`,
        file: attachment,
      });
    } else {
      await client.sendMessage(Number(TELEGRAM_PRIVATE_CHANNEL_ID), {
        message: `${message}\n\nMellins i-Style Head Office`,
      });
    }
  } catch (err) {
    console.error("Send Channel Message Function", err);
    await client.disconnect();
  }
}

export default sendChannelMessage;
