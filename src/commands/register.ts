import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

export default function RegisterCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Register", async (ctx: MyContext) => {
    await ctx.reply(`Please send me your South-African Identity number:`);
  });
}
