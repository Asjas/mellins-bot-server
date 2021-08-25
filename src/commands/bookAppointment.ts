import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function BookAppointmentCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Book Appointment", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.BOOK_APPOINTMENT_MESSAGE, keyboards.fullBotKeyboard(ctx));
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });
}
