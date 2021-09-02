// this service is used to query all the information from the Mellins Channel
import dotenv from "dotenv";
import { Api, TelegramClient } from "telegram";
import { Logger } from "telegram/extensions/index.js";
import { StoreSession } from "telegram/sessions/index.js";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;

async function getFullChannel() {
  const storeSession = new StoreSession(".user_telegram_session");

  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  Logger.setLevel("error");

  await client.connect();

  let result;

  // Get full channel information
  try {
    result = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: -1001198053895,
      }),
    );
  } catch (err) {
    console.error(err);
  }

  await client.disconnect();

  return result;
}

export default getFullChannel;
