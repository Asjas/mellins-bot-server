import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerStatement from "../services/getCustomerStatement";
import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function StatementsCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Statements", async (ctx: MyContext) => {
    const customerId = ctx?.customerId;

    await ctx.reply(`Fetching your statements...`);

    const customer = await getCustomerStatement(customerId);

    if (customer?.error === 2000) {
      await ctx.reply(constants.NO_OUTSTANDING_STATEMENTS, keyboards.fullBotKeyboard(ctx));
      return;
    }

    Object.values(customer).forEach(async (branch) => {
      const pdfBuffer = Buffer.from(branch.statement, "base64");

      await ctx.reply(`Please see your current statements:`);
      await ctx.replyWithDocument({ source: pdfBuffer, filename: "statement.pdf" }, keyboards.fullBotKeyboard(ctx));
    });
  });
}
