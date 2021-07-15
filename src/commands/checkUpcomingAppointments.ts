import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerBalance from "../services/getCustomerBalance";
import * as keyboards from "../messages/botKeyboards";

export default function CheckUpcomingAppointmentCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Check Upcoming Appointments", async (ctx: MyContext) => {
    const customerId = ctx?.customerId;

    await ctx.reply("Getting Appointment Information...");

    const customer = await getCustomerBalance(customerId);
    await ctx.reply(`Your next appointment is ${customer.exam_due_date}.`, keyboards.appointmentKeyboard());
  });
}
