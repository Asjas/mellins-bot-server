import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";
import { botReply } from "./reply";

export default function RegisterCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Register", async (ctx: MyContext) => {
    try {
      await botReply(ctx, `Please send me your South-African Identity number:`);
    } catch (err) {
      console.error(err);
    }
  });
}
