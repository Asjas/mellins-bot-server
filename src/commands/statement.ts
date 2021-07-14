import { Markup } from "telegraf";

import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram.js";

import getCustomerStatement from "../services/getCustomerStatement.js";
import * as constants from "../constants/botMessages";

export default function StatementCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Statement", async (ctx: MyContext) => {
    const customerId = ctx?.customerId;

    if (!customerId) {
      await ctx.reply(
        "You are not registered at the moment, please start the registration process",
        Markup.keyboard(["Register"]).oneTime(),
      );
      return;
    }

    await ctx.reply(`Fetching your statements...`);
    const customer = await getCustomerStatement(customerId);

    if (customer.error === 2000) {
      await ctx.reply(constants.NO_OUTSTANDING_STATEMENTS);
      return;
    }

    Object.values(customer).forEach(async (branch) => {
      const pdfBuffer = Buffer.from(branch.statement, "base64");

      await ctx.reply(`Please see your current statements:`);

      await ctx.replyWithDocument(
        { source: pdfBuffer, filename: "statement.pdf" },
        Markup.keyboard(["Balance", "Statement"]).resize().oneTime(),
      );
    });
  });
}
