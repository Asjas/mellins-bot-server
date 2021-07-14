// We need middleware for the Telegram bot that queries the database to see if a user has been registered.
// This is so that we don't have to prompt the user to register for every interaction with the bot.

import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram.js";

import { telegramDb } from "../db/telegram";

function botMiddleware(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  // this middleware allows us to fetch the user from the database before the bot request is processed
  // we use this so that we don't have to ask a user to register multiple times when they've registered once

  bot.use(async (ctx: MyContext, next) => {
    const result = await telegramDb.telegramUser.findUnique({
      where: { userTelegramId: ctx.message.from.id },
      select: { rsaId: true },
    });

    // if we couldn't find a user in the database then we exit the middleware
    if (!result?.rsaId) {
      await next();
      return;
    }

    // if we get here then there was a user registered in the database, we add the RSA ID to the bot `ctx`
    ctx.customerId = result.rsaId;

    await next();
  });
}

export default botMiddleware;
