import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function ShopOnlineCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Shop Online", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.SHOP_ONLINE_MESSAGE, keyboards.fullBotKeyboard(ctx));
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });
}
