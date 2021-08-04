import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";

import { botReply } from "./reply";

export default function BackCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Back", async (ctx: MyContext) => {
    try {
      await botReply(
        ctx,
        "Thank you for using @Mellinsbot's\n\nPlease select an action to continue:",
        keyboards.fullBotKeyboard(ctx),
      );
    } catch (err) {
      console.error(err);
    }
  });
}
