import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import createFreshdeskTicket from "../services/createFreshdeskTicket";
import * as keyboards from "../messages/botKeyboards";

export default function ShareContactCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.use(async (ctx: any, next) => {
    const contact = ctx.message?.contact;

    if (contact) {
      const { first_name: firstName, last_name: lastName, phone_number: contactNo } = contact;
      const ticket = await createFreshdeskTicket({ firstName, lastName, contactNo });

      await ctx.reply(
        `A support ticket has been logged and an agent will contact you shortly.\n\nPlease note your ticket number: ${ticket.id}`,
        keyboards.fullBotKeyboard(ctx),
      );
    }

    // the message didn't contain a Telegram Contact, forward request onwards
    next();
  });
}
