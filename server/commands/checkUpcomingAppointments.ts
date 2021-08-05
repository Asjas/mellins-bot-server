import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerBalance from "../services/getCustomerBalance";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function CheckUpcomingAppointmentCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Check Upcoming Appointments", async (ctx: MyContext) => {
    try {
      const customerId = ctx?.customerId;
      let appointmentFound: boolean;
      let noAppointmentsFound: boolean;

      await botReply(ctx, "Getting your appointment information...");

      const customer = await getCustomerBalance(customerId);

      Object.values(customer.branches).forEach(async (branch) => {
        if (branch.appointment) {
          appointmentFound = true;
          await ctx.reply(
            `Your next appointment is scheduled at ${branch.branch_name} for ${branch.appointment.date} at ${branch.appointment.time}.`,
            keyboards.appointmentKeyboard(),
          );
        } else {
          noAppointmentsFound = true;
        }
      });

      if (!appointmentFound && noAppointmentsFound) {
        await ctx.reply(
          `You have no appointments currently scheduled.\n\nYour next due date is: ${customer.exam_due_date}`,
          keyboards.appointmentKeyboard(),
        );
      }
    } catch (err) {
      console.error(err);
    }
  });
}
