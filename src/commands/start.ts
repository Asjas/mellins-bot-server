import { Markup } from "telegraf";

import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

export default function StartCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.command("start", async (ctx: MyContext) => {
    const customerId = ctx?.customerId;
    const { first_name: firstName } = ctx.message.from;

    // if the user already registered an account, redirect them to the menu
    if (customerId) {
      await ctx.reply(
        `Hi ${firstName},\n\nThank you for using @Mellinsbot's\n\nPlease select an action to continue:`,
        Markup.keyboard(["Balance", "Statement"]).resize(),
      );
      return;
    }

    await ctx.reply(
      `Hi ${firstName},\n\nThank you for using @Mellinsbot's\n\nPlease select Register to continue:`,
      Markup.keyboard(["Register", "Request a Callback"], { columns: 2 }).oneTime(),
    );
  });
}
