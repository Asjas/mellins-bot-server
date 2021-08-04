import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function RequestACallbackCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.action("Request a Callback", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.FRESHDESK_REQUEST_NUMBER, keyboards.shareContactNumber());
    } catch (err) {
      console.error(err);
    }
  });

  bot.hears("Request a Callback", async (ctx: MyContext) => {
    try {
      await botReply(ctx, constants.FRESHDESK_REQUEST_NUMBER, keyboards.shareContactNumber());
    } catch (err) {
      console.error(err);
    }
  });
}
