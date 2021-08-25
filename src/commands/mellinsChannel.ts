import type TelegrafPKG from "telegraf";
import type { Update } from "typegram";
import type MyContext from "../types/telegram";

import * as keyboards from "../messages/botKeyboards";
import { botReply } from "./reply";

export default function MellinsChannelLinkCommand(bot: TelegrafPKG.Telegraf<TelegrafPKG.Context<Update>>) {
  bot.hears("Mellins Channel", async (ctx: MyContext) => {
    console.log("triggering");
    try {
      await botReply(ctx, "Open Mellins Channel", keyboards.inlineChannelLinkKeyboard());
    } catch (err) {
      await botReply(ctx, "An error occurred. Please try again.");
      console.error(err);
    }
  });
}
