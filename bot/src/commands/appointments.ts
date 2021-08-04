import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

import { botReply } from "./reply";

export default function AppointmentsCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Appointments", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.APPOINTMENT_MESSAGE, keyboards.appointmentKeyboard());
    } catch (err) {
      console.error(err);
    }
  });
}
