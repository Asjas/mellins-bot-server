// this service is used to invite a user to the private Mellins channel
import dotenv from "dotenv";
import { Api, TelegramClient } from "telegram";
import { Logger } from "telegram/extensions/index.js";
import { StoreSession } from "telegram/sessions/index.js";

import { userJoinedChannel } from "../db/telegram";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;

async function inviteUserToChannel(telegramId: number, messageId: number) {
  const storeSession = new StoreSession(".user_telegram_session");

  const client = new TelegramClient(storeSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  Logger.setLevel("error");

  await client.connect();

  // We need to resolve and store the user as a session so that we can invite them
  try {
    await client.getMessages("ajroos2", { limit: 1, ids: messageId });

    client.session.save();
  } catch {}

  // Try to invite the user to the channel
  try {
    await client.invoke(
      new Api.channels.InviteToChannel({
        channel: -1001198053895,
        users: [new Api.PeerUser({ userId: telegramId })],
      }),
    );
  } catch (err) {
    console.error(err);
  }

  await client.disconnect();
}

export default inviteUserToChannel;
