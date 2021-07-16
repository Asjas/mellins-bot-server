import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";

export default async function BranchRegisterCallback(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>, branches) {
  branches.forEach((branch: any) => {
    bot.hears(branch.name, async (ctx: MyContext) => {
      await ctx.reply(`Here is the Map pin for: ${branch.name}`, keyboards.fullBotKeyboard(ctx));
      await ctx.replyWithLocation(branch.latitude, branch.longitude);
    });
  });
}
