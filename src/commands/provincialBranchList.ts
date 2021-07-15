import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function RegisterCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Provincial Branch List", async (ctx: MyContext) => {
    await ctx.reply(constants.PROVINCIAL_BRANCHES_MESSAGE, keyboards.provincialBranchListKeyboard());
  });
}
