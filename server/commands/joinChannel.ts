import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";
import inviteUserToChannel from "../services/inviteUserToChannel";

export default function JoinMellinsChannelCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Join Channel", async (ctx: MyContext) => {
    try {
      const { id: telegramId } = ctx.message.from;

      await inviteUserToChannel(telegramId);

      await botReply(
        ctx,
        "Thank you, you've successfully joined the Mellins Telegram Channel.",
        keyboards.fullBotKeyboard(ctx),
      );
    } catch (err) {
      console.error(err);
    }
  });
}
