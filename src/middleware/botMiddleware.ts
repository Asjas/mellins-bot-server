// We need middleware for the Telegram bot that queries the database to see if a user has been registered.
// This is so that we don't have to prompt the user to register for every interaction with the bot.

import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import getUserFromTelegramChannel from "../services/getUserFromTelegramChannel";
import { telegramDb } from "../db/telegram";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "../commands/reply";

function botMiddleware(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.use(async (ctx: any, next) => {
    const userId = ctx?.message?.from?.id;

    // look for the user in the local database to see if they registered before
    const result = await telegramDb.telegramUser.findUnique({
      where: { userTelegramId: ctx.message?.from?.id ?? -1 },
      select: { rsaId: true },
    });

    if (ctx?.update?.channel_post) {
      console.log("global message", ctx?.update?.channel_post?.sender_chat);
    }

    if (userId) {
      const result: boolean = await getUserFromTelegramChannel(userId);
      ctx.joinedPrivateChannel = result;
    }

    // if the message is sent from a private channel, ignore the message
    if (ctx?.update?.channel_post) return;

    const text = ctx.message?.text;
    const essentialCommands = ["/start", "Register"];
    const rsaIdLength = 13;

    // allows users to request a callback if they haven't registered before
    // requesting a callback will work for registered users automatically
    if (!Boolean(result?.rsaId) && text === "Request a Callback") {
      await next();
      return;
    }

    if (Boolean(result?.rsaId) && essentialCommands.includes(text)) {
      // if the user already registered an account, redirect them to the menu
      ctx.customerId = result.rsaId;

      await botReply(
        ctx,
        "Thank you for using @Mellinsbot's\n\nPlease select an action to continue:",
        keyboards.fullBotKeyboard(ctx),
      );
      return;
    }

    if (Boolean(result?.rsaId)) {
      // if we get here then there was a user found in the telegram database
      // so we add the RSA ID to the bot `ctx` and forward the request onwards
      ctx.customerId = result.rsaId;

      await next();
      return;
    }

    // if we couldn't find a user in the telegram database then we exit the middleware
    // this will cause the bot to prompt the user to Register
    if (!essentialCommands.includes(text) && !result?.rsaId && text?.length !== rsaIdLength) {
      await botReply(
        ctx,
        "You are not registered at the moment, please start the registration process",
        keyboards.registerKeyboard(),
      );

      return;
    }

    await next();
  });
}

export default botMiddleware;
