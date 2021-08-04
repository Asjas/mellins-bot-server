import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function JoinMellinsChannelCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Join Mellins Channel", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.JOIN_MELLINS_CHANNEL, keyboards.fullBotKeyboard(ctx));
    } catch (err) {
      console.error(err);
    }
  });
}
