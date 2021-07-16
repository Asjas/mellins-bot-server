import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function BookAppointmentCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Book Appointment", async (ctx: MyContext) => {
    await ctx.reply(constants.BOOK_APPOINTMENT_MESSAGE, keyboards.fullBotKeyboard(ctx));
  });
}
