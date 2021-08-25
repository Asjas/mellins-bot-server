import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerBalance from "../services/getCustomerBalance";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function BalanceCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Balance", async (ctx: MyContext) => {
    try {
      const customerId = ctx?.customerId;

      await botReply(ctx, `Fetching your balances...`);

      const customer = await getCustomerBalance(customerId);

      await botReply(
        ctx,
        `Please see your current outstanding balances at these branches:\n\n`,
        keyboards.fullBotKeyboard(ctx),
      );

      Object.values(customer.branches).forEach(async (branch) => {
        const response = `Branch Name: ${branch.branch_name}\nCustomer Number: ${branch.customer_number}\nPatient Name: ${branch.patient_name}\nCustomer Balance: R ${branch.customer_balance}`;

        await ctx.reply(response);
      });
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });
}
