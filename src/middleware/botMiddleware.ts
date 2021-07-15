// We need middleware for the Telegram bot that queries the database to see if a user has been registered.
// This is so that we don't have to prompt the user to register for every interaction with the bot.

import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import { telegramDb } from "../db/telegram";
import * as keyboards from "../messages/botKeyboards";

function botMiddleware(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.use(async (ctx: any, next) => {
    const result = await telegramDb.telegramUser.findUnique({
      where: { userTelegramId: ctx.message.from.id },
      select: { rsaId: true },
    });

    const text = ctx.message.text;
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

      await ctx.reply(
        `Hi ${ctx.message.from.first_name},\n\nThank you for using @Mellinsbot's\n\nPlease select an action to continue:`,
        keyboards.fullBotKeyboard(),
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
      await ctx.reply(
        "You are not registered at the moment, please start the registration process",
        keyboards.registerKeyboard(),
      );

      return;
    }

    await next();
  });
}

export default botMiddleware;
