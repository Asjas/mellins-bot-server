import { Markup } from "telegraf";

import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram.js";

import getCustomerBalance from "../services/getCustomerBalance.js";

export default function BalanceCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Balance", async (ctx: MyContext) => {
    const customerId = ctx?.customerId;

    if (!customerId) {
      await ctx.reply(
        "You are not registered at the moment, please start the registration process",
        Markup.keyboard(["Register"]).oneTime(),
      );
      return;
    }

    const customer = await getCustomerBalance(customerId);

    await ctx.reply(`Please see your current outstanding balances at these branches:\n\n`);

    Object.values(customer.branches).forEach(async (branch) => {
      const response = `Branch Name: ${branch.branch_name}\nCustomer Number: ${branch.customer_number}\nPatient Name: ${branch.patient_name}\nCustomer Balance: R ${branch.customer_balance}`;

      await ctx.reply(response, Markup.keyboard(["Balance", "Statement"]).resize());
    });
  });
}
