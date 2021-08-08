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

      await ctx.reply("Inviting you to the Mellins Telegram channel...");

      await bot.telegram.forwardMessage(1425866959, telegramId, ctx.message.message_id);

      await inviteUserToChannel(telegramId);

      await botReply(ctx, "You've successfully joined the Mellins Telegram channel.", keyboards.fullBotKeyboard(ctx));
    } catch (err) {
      console.error(err);
    }
  });
}
