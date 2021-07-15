import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as constants from "../messages/botMessages";
import * as keyboards from "../messages/botKeyboards";

export default function SocialMediaCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Social Media", async (ctx: MyContext) => {
    await ctx.reply(constants.SOCIAL_MEDIA_MESSAGE, keyboards.socialMediaKeyboard());
  });
}
