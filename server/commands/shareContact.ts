import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import createFreshdeskTicket from "../services/createFreshdeskTicket";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function ShareContactCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.use(async (ctx: any, next) => {
    try {
      const contact = ctx.message?.contact;

      if (!contact) {
        await next();
        return;
      }

      if (contact) {
        const { first_name: firstName, last_name: lastName, phone_number: contactNo } = contact;
        const ticket = await createFreshdeskTicket({ firstName, lastName, contactNo });

        await botReply(
          ctx,
          `A support ticket has been logged and an agent will contact you shortly.\n\nPlease note your ticket number: ${ticket.id}`,
          keyboards.fullBotKeyboard(ctx),
        );

        return;
      }
    } catch (err) {
      console.error(err);
    }

    // the message didn't contain a Telegram Contact, forward request onwards
    await next();
  });
}
