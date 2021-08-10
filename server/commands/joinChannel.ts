import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";
import inviteUserToChannel from "../services/inviteUserToChannel";
import { userJoinedChannel } from "../db/telegram";
import { Markup } from "telegraf";

export default function JoinMellinsChannelCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Join Channel", async (ctx: MyContext) => {
    try {
      const { id: telegramId } = ctx.message.from;

      await ctx.reply("Inviting you to the Mellins Telegram channel...");

      const forwardedMessage = await bot.telegram.forwardMessage(1425866959, telegramId, ctx.message.message_id, {
        disable_notification: true,
      });

      await inviteUserToChannel(telegramId, forwardedMessage.message_id);

      // We need this to hide the `Join Mellins Channel` keyboard button before we send the keyboard
      ctx.joinedMellinsChannel = "member";

      await userJoinedChannel(ctx);

      await botReply(ctx, "You've successfully joined the Mellins Telegram channel.", keyboards.fullBotKeyboard(ctx));

      ctx.reply(
        "Open Mellins Channel",
        Markup.inlineKeyboard([Markup.button.url("Mellins Channel", "https://t.me/joinchat/38hEkc3DJkplMmU0")]),
      );
    } catch (err) {
      console.error(err);
    }
  });
}
