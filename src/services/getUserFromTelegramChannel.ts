// this service is used to query whether a Telegram user is in the Private Mellins Channel
import dotenv from "dotenv";
import { Api, TelegramClient } from "telegram";
import { StoreSession } from "telegram/sessions";

dotenv.config();

const { TELEGRAM_APP_ID, TELEGRAM_APP_HASH, TELEGRAM_PRIVATE_CHANNEL_ID } = process.env;

const apiId = Number(TELEGRAM_APP_ID);
const apiHash = TELEGRAM_APP_HASH;
const channelId = Number(TELEGRAM_PRIVATE_CHANNEL_ID);

const storeSession = new StoreSession(".telegram_session");
const client = new TelegramClient(storeSession, apiId, apiHash, {
  connectionRetries: 5,
});

async function getUserFromTelegramChannel(userId: number) {
  let isUserInChannel: boolean;

  try {
    await client.connect();

    const result: any = await client.invoke(
      new Api.channels.GetParticipant({
        channel: channelId,
        participant: new Api.ChannelParticipant({ userId, date: Date.now() }),
      }),
    );

    isUserInChannel = result.participant.userId === userId;

    await client.disconnect();
  } catch (err) {
    if (err.message === "USER_NOT_PARTICIPANT") {
      isUserInChannel = false;

      await client.disconnect();
      return;
    }
    console.error(err);
  }

  return isUserInChannel;
}

export default getUserFromTelegramChannel;
