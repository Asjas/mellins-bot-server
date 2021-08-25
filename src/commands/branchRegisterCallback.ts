import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply, botReplyWithLocation } from "./reply";

export default function BranchRegisterCallback(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>, branches) {
  branches.forEach((branch: any) => {
    bot.hears(branch.name, async (ctx: MyContext) => {
      try {
        await botReply(ctx, `Here is the Map pin for ${branch.name}`, keyboards.fullBotKeyboard(ctx));
        await botReplyWithLocation(ctx, { latitude: branch.latitude, longitude: branch.longitude });
      } catch (err) {
        await botReply(ctx, "An error occurred. Please try again.");
        console.error(err);
      }
    });
  });
}
