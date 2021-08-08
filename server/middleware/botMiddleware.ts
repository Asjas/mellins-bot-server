// We need middleware for the Telegram bot that queries the database to see if a user has been registered.
// This is so that we don't have to prompt the user to register for every interaction with the bot.

import dotenv from "dotenv";
import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";

import { createUser, isUserInDb } from "../db/telegram";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "../commands/reply";

dotenv.config();

const { TELEGRAM_PRIVATE_CHANNEL_ID } = process.env;

function botMiddleware(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.use(async (ctx: any, next) => {
    // If any message comes from a channel or group we ignore it
    try {
      if (ctx?.update?.channel_post) {
        console.log("global message", ctx?.update?.channel_post?.sender_chat);

        // Do nothing when a message is posted in a Channel or a Group
        return;
      }

      // Set user telegram ID based on whether it's an update or a message coming from Telegram
      let userTelegramId: number;

      if (ctx?.update?.my_chat_member?.from?.id) {
        userTelegramId = ctx?.update?.my_chat_member?.from?.id;
      } else if (ctx?.message?.from?.id) {
        userTelegramId = ctx?.message?.from?.id;
      } else {
        userTelegramId = -1;
      }

      // look for the user in the local database to see if they registered before
      const result = await isUserInDb(userTelegramId);
      ctx.sessionId = result?.sessionId ?? "0";

      // check if the user has joined the Private Mellins Channel
      if (userTelegramId !== -1) {
        const chatMember = await bot.telegram.getChatMember(TELEGRAM_PRIVATE_CHANNEL_ID, userTelegramId);
        ctx.joinedPrivateChannel = chatMember.status;
      }

      // if the message is sent from a private channel, ignore the message
      if (ctx?.update?.channel_post) return;

      const text = ctx.message?.text;
      const essentialCommands = ["/start", "Register"];
      const rsaIdLength = 13;

      if (text === "/start" && !result?.rsaId) {
        try {
          await createUser(ctx);
        } catch (err) {
          if (err.code === "P2002") {
            await next();
            return;
          }
        }
      }

      // allows users to request a callback if they haven't registered before
      // requesting a callback will work for registered users automatically
      if (
        (!Boolean(result?.rsaId) && text === "Request a Callback") ||
        (!Boolean(result?.rsaId) && ctx.message?.contact)
      ) {
        await next();
        return;
      }

      // if the user already registered an account, redirect them to the menu
      if (Boolean(result?.rsaId) && essentialCommands.includes(text)) {
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
    } catch (err) {
      console.error(err);
    }

    await next();
  });
}

export default botMiddleware;
