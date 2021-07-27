import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function InstagramCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Instagram", async (ctx: MyContext) => {
    await botReply(ctx, constants.INSTAGRAM_MESSGAGE, keyboards.socialMediaKeyboard());
  });
}
