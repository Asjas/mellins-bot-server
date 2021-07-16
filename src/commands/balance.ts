import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerBalance from "../services/getCustomerBalance";
import * as keyboards from "../messages/botKeyboards";

export default function BalanceCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Balance", async (ctx: MyContext) => {
    const customerId = ctx?.customerId;

    const customer = await getCustomerBalance(customerId);

    await ctx.reply(`Please see your current outstanding balances at these branches:\n\n`);

    Object.values(customer.branches).forEach(async (branch) => {
      const response = `Branch Name: ${branch.branch_name}\nCustomer Number: ${branch.customer_number}\nPatient Name: ${branch.patient_name}\nCustomer Balance: R ${branch.customer_balance}`;

      await ctx.reply(response, keyboards.fullBotKeyboard(ctx));
    });
  });
}
