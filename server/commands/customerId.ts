import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import getCustomerFromDb from "../services/getCustomerFromDb";
import { customerRSAID } from "../db/telegram";
import LuhnAlgorithm from "../utils/LuhnAlgorithm";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply, botReplyWithInlineKeyboard } from "./reply";

export default function CustomerIdCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  // check for 13 numbers in a single message (RSA ID)
  bot.hears(/^\d{13}$/, async (ctx: MyContext) => {
    try {
      const { id: telegramId, first_name: firstName = "", last_name: lastName = "" } = ctx.message.from;
      const { text: rsaId } = ctx.message as any;

      // RSA ID is invalid
      if (LuhnAlgorithm(rsaId) === false) {
        await ctx.reply(constants.INVALID_RSA_ID, keyboards.callbackKeyboard());
        return;
      }

      const customerFound = await getCustomerFromDb(rsaId);

      if (customerFound) {
        try {
          await customerRSAID(ctx, rsaId);
        } catch (err: any) {
          // if the user is already registered, exit
          console.log(err);
        }

        await ctx.reply(`Welcome ${firstName} ${lastName}. You've been successfully registered.`);

        await botReply(ctx, `Please select one of these buttons to continue:`, keyboards.fullBotKeyboard(ctx));
      } else {
        await botReply(ctx, constants.RSA_ID_NOT_FOUND, keyboards.registerAndCallbackKeyboard());
      }
    } catch (err) {
      console.error(err);
    }
  });
}
