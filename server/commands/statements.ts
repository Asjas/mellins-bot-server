import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerStatement from "../services/getCustomerStatement";
import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply, botReplyWithDocument } from "./reply";

export default function StatementsCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Statements", async (ctx: MyContext) => {
    try {
      const customerId = ctx?.customerId;

      await botReply(ctx, `Fetching your statements...`);

      const customer = await getCustomerStatement(customerId);

      if (customer?.error === 2000) {
        await ctx.reply(constants.NO_OUTSTANDING_STATEMENTS, keyboards.fullBotKeyboard(ctx));
        return;
      }

      Object.values(customer).forEach(async (branch) => {
        const pdfBuffer = Buffer.from(branch.statement, "base64");

        await botReply(ctx, "Please see your current statements:");
        await botReplyWithDocument(
          ctx,
          { source: pdfBuffer, filename: "statement.pdf" },
          keyboards.fullBotKeyboard(ctx),
        );
      });
    } catch (err) {
      console.error(err);
    }
  });
}
