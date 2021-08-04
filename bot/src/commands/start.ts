import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function StartCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.command("start", async (ctx: MyContext) => {
    const { first_name: firstName = "", last_name: lastName = "", username } = ctx.message.from;
    console.log("ctx", ctx.message.from);

    try {
      await botReply(
        ctx,
        "Thank you for using @Mellinsbot's\n\nPlease select Register to continue:",
        keyboards.registerAndCallbackKeyboard(),
      );
    } catch (err) {
      console.error(err);
    }
  });
}
