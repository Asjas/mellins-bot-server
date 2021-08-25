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
        const { first_name: firstName = "", last_name: lastName = "", phone_number: contactNo } = contact;
        const ticket = await createFreshdeskTicket({ firstName, lastName, contactNo });

        // If it fails to create a freshdesk ticket, send a message so that the user tries again.
        if (!ticket) {
          await botReply(
            ctx,
            `An error occurred while creating a support ticket. Please try sharing your contact details again.`,
            keyboards.fullBotKeyboard(ctx),
          );
        }

        await botReply(
          ctx,
          `A support ticket has been logged and an agent will contact you shortly.\n\nPlease note your ticket number: ${ticket.id}`,
          keyboards.fullBotKeyboard(ctx),
        );

        return;
      }
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }

    // the message didn't contain a Telegram Contact, forward request onwards
    await next();
  });
}
