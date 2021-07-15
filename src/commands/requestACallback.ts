import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function RequestACallbackCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.action("Request a Callback", async (ctx: MyContext) => {
    await ctx.reply(constants.FRESHDESK_REQUEST_NUMBER, keyboards.shareContactNumber());
    return;
  });

  bot.hears("Request a Callback", async (ctx: MyContext) => {
    await ctx.reply(constants.FRESHDESK_REQUEST_NUMBER, keyboards.shareContactNumber());
    return;
  });
}
