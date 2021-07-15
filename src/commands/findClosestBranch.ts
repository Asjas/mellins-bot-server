import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function FindClosestBranchCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Find Closest Branch", async (ctx: MyContext) => {
    await ctx.reply(constants.LOCATION_REQUEST_MESSAGE, keyboards.shareLocationKeyboard());
  });
}
