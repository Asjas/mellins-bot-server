import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function MellinsChannelLinkCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Mellins Channel Link", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.MELLINS_CHANNEL_LINK, keyboards.fullBotKeyboard(ctx));
    } catch (err) {
      console.error(err);
    }
  });
}
