import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerFromDb from "../services/getCustomerFromDb";
import { telegramDb } from "../db/telegram";
import LuhnAlgorithm from "../utils/LuhnAlgorithm";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function CustomerIdCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  // check for 13 numbers in a single message (RSA ID)
  bot.hears(/^\d{13}$/, async (ctx: MyContext) => {
    const { id: userTelegramId, first_name: firstName, last_name: lastName } = ctx.message.from;
    const { text: rsaId } = ctx.message as any;

    // RSA ID is invalid
    if (LuhnAlgorithm(rsaId) === false) {
      await ctx.reply(constants.INVALID_RSA_ID);
      return;
    }

    const customerFound = await getCustomerFromDb(rsaId);

    if (customerFound) {
      try {
        await telegramDb.telegramUser.create({ data: { firstName, lastName, rsaId, userTelegramId } });
      } catch (err: any) {
        // if the user is already registered, send a message and exit
        if (err.code === "P2002") {
          await ctx.reply(`The ID ${rsaId} is already registered.`, keyboards.fullBotKeyboard(ctx));
          return;
        }
      }

      await ctx.reply(
        `Hi, ${firstName}\n\nYou've been successfully registered.\n\nPlease select one of these buttons to continue:`,
        keyboards.fullBotKeyboard(ctx),
      );
    } else {
      await ctx.reply(constants.RSA_ID_NOT_FOUND, {
        parse_mode: "HTML",
        ...keyboards.inlineCallbackKeyboard(),
      });
    }
  });
}
