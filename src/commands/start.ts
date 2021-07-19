import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function StartCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.command("start", async (ctx: MyContext) => {
    await botReply(
      ctx,
      "Thank you for using @Mellinsbot's\n\nPlease select Register to continue:",
      keyboards.registerAndCallbackKeyboard(),
    );
  });
}
