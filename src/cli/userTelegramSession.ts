// This CLI is used to authenticate to the Telegram API and stores the session
// in a folder named `.user_telegram_session` so that we only have to authenticate once.

// This Session and the Telegram API is used so that we can query whether
// a user exists in a private telegram group channel

import { TelegramClient } from "telegram";
import { StoreSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import input from "input";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;

const storeSession = new StoreSession(".user_telegram_session");
const client = new TelegramClient(storeSession, apiId, apiHash, {
  connectionRetries: 5,
});

(async function run() {
  try {
    await client.start({
      phoneNumber: async () => await input.text("number ?"),
      password: async () => await input.text("password ?"),
      phoneCode: async () => await input.text("code ?"),
      onError: (err) => console.log(err),
    });

    await client.connect();

    // save current session so that I don't get prompted for my phoneNumber every time I launch this
    client.session.save();
  } catch (err) {
    console.error(err);
  }

  await client.disconnect();
  process.exit(0);
})();
