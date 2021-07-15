import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";

export default function BackCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Back", async (ctx: MyContext) => {
    const { first_name: firstName } = ctx.message.from;

    await ctx.reply(
      `Hi ${firstName},\n\nThank you for using @Mellinsbot's\n\nPlease select an action to continue:`,
      keyboards.fullBotKeyboard(),
    );
  });
}
